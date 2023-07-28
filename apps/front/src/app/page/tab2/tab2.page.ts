import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AuthService } from '../login/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private baseUrl = 'https://world.openfoodfacts.org/api/v2/product/';
  product: any;
  showProductDetails = false;


  constructor(private http: HttpClient,public authService: AuthService, private router: Router,private toastController: ToastController) {}

  getProduct(barcode: string) {
    this.http.get<any>(`${this.baseUrl}${barcode}`).subscribe(data => {
      this.product = {


        product_name_fr: data.product.product_name_fr,
        nutriscore_grade: data.product.nutriscore_grade,
        image_front_url: data.product.image_front_url,
      };
      console.log(this.product);
    });

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

  clearProduct() {
    this.product = null;
    this.showProductDetails = false;
  }

  ngOnInit() {

  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  async onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    await this.presentToast('Logout successful'); // This method is async now
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
