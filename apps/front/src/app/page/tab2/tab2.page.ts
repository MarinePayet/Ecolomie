import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from '../login/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../newproduct/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private baseUrl = 'https://world.openfoodfacts.org/api/v2/product/';
  product: any;
  showProductDetails = false;
  storages: any;
  categories: any;

  constructor(private http: HttpClient,public authService: AuthService, private router: Router,private toastController: ToastController,
    private apiService: ApiService) {
      this.product = {
        dlc: '',
        quantity: 0,
        storage: '',
        product_name_fr: '',
        nutriscore_grade: '',
        image_front_url: '',
        category: ''
      };
     }
  getProduct(barcode: string) {
    this.http.get<any>(`${this.baseUrl}${barcode}`).subscribe(data => {
      this.product = {
        ...this.product,
        product_name_fr: data.product.product_name_fr,
        nutriscore_grade: data.product.nutriscore_grade,
        image_front_url: data.product.image_front_url,
      };
      console.log(this.product);
    }, error => {
      console.error('Error getting product:', error);
    });

  }
  resetProduct() {
    this.product = {
      dlc: '',
      quantity: 0,
      storage: '',
      product_name_fr: '',
      nutriscore_grade: '',
      image_front_url: '',
      category: ''
    };
  }


  async scanBarcode() {
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.getProduct(result.content);
      }
      this.showProductDetails = true;
      this.resetProduct();

    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  }

  clearProduct() {
    this.product = null;
    this.showProductDetails = false;
  }

  getStorages() {
    this.apiService.getStorages().subscribe((data) => {
      this.storages = data['hydra:member'];
      console.log(this.storages);
    }, error => {
      console.error('Error getting storages:', error);
    });
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data['hydra:member'];
      console.log(this.categories);
    }, error => {
      console.error('Error getting categories:', error);
    });
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

  saveProduct() {
    const productDetails = {
      DLC: this.product.dlc,
      quantity: this.product.quantity,
      storage: this.product.storage,
      product: {
        name: this.product.product_name_fr,
        nutriscore: this.product.nutriscore_grade,
        image: this.product.image_front_url
      },
      category: this.product.category,
    };

    console.log("Storage IRI: ", this.product.storage);
    console.log("Category IRI: ", this.product.category);

    this.apiService.saveProduct(productDetails).subscribe(
      (response: any) => {
        console.log('Produit enregistré avec succès', response);
      },
      (error: any) => {
        console.error("Erreur lors de l'enregistrement du produit", error);
      }
    );
  }

}
