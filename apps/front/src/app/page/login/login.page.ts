import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;
  

  constructor(private authService: AuthService, private toastController: ToastController, private router: Router) {
    this.email = '';
    this.password = '';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      data => {
        console.log('Login successful');
        this.presentToast('Login successful');
        this.router.navigate(['/tabs/tab1']);
      },
      error => {
        console.log('Login failed');
        this.presentToast('Login failed');
      }
    );
  }
}
