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
  firstname: string;
  lastname: string;
  isRegistering = false;

  constructor(private authService: AuthService, private toastController: ToastController, private router: Router) {
    this.email = '';
    this.password = '';
    this.firstname = '';
    this.lastname = '';
    this.password = '';
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    if (this.isRegistering) {
      this.onRegister();
    } else {
      this.authService.login(this.email, this.password).subscribe(
        data => {
          console.log('Login successful');
          this.presentToast('Login successful');
          this.router.navigate(['/tabs/tab1']);
          this.email = '';
          this.password = '';
        },

        error => {
          console.log('Login failed', error);
          this.presentToast(error);
        }
      );
    }
  }

  onRegister() {
    if (this.firstname.trim() === '' || this.lastname.trim() === '') {
      this.presentToast('Firstname and Lastname cannot be blank.');
      return;
    }

    this.authService.register(this.email, this.password, this.firstname, this.lastname).subscribe(
      data => {
        console.log('Registration successful');
        this.presentToast('Registration successful');
        this.router.navigate(['/tabs/tab1']);
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
      },
      error => {
        console.log('Registration failed', error);
        this.presentToast(error);
      }
    );
  }


  onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }
}
