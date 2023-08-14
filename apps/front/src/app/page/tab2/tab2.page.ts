import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from '../login/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../newproduct/api.service';


interface Product {

  name: string;
  nutriscore: string;
  image: string;
  dlc?: string;
  quantity?: number;
  storage?: string;
  category?: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  product: Product = {
    name: '',
    nutriscore: '',
    image: '',
  };
  storages: any[] = [];
  categories: any[] = []
  showProductDetails = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private apiService: ApiService
  ) {
  }

  getProduct(barcode: string) {
    this.apiService.getProduct(barcode).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.product = data;
        console.log(this.product);
        this.showProductDetails = true;
      },
      (error) => {
        console.error('Error getting product:', error);
      }
    );
  }




  async scanBarcode() {
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.getProduct(result.content);
      }
      this.showProductDetails = true;
    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  }

  getStorages() {
    this.apiService.getStorages().subscribe(
      (data) => {
        this.storages = data['hydra:member'];
        console.log(this.storages);
      },
      (error) => {
        console.error('Error getting storages:', error);
      }
    );
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.categories = data['hydra:member'];
        console.log(this.categories);
      },
      (error) => {
        console.error('Error getting categories:', error);
      }
    );
  }

  ngOnInit() {
    this.getStorages();
    this.getCategories();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  async onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    await this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  resetProduct() {
    this.product = {
      name: '',
      nutriscore: '',
      image: '',
      dlc: '',
      quantity: 0,
      storage: '',
      category: '',
    };
    this.showProductDetails = false;
  }

  saveProduct() {
    const productDetails = {
      DLC: this.product.dlc,
      quantity: this.product.quantity,
      storage: this.product.storage,
      category: this.product.category,
      product: {
        name: this.product.name,
        nutriscore: this.product.nutriscore,
        image: this.product.image,
      }
    };

    console.log("Storage IRI: ", this.product.storage);
    console.log("Category IRI: ", this.product.category);

    console.log("Product Details to Save:", productDetails); // Ajout du log ici

    this.apiService.saveProduct(productDetails).subscribe(response => {
      console.log('Product saved successfully', response);
    }, error => {
      console.error("Error saving product", error);
    });
  }

}
