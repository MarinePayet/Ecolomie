import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  isRegistering = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: [''],
      lastname: ['']
    });
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get email() {
    return this.loginForm.controls['email'];
  }



  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.presentToast('Please fill out the form correctly');
      return;
    }

    const { email, password, firstname, lastname } = this.loginForm.value;

    if (this.isRegistering) {
      this.onRegister(email, password, firstname, lastname);
    } else {
      this.authService.login(email, password).subscribe(
        data => {
          console.log('Login successful');
          this.presentToast('Login successful');
          this.router.navigate(['/tabs/tab1']);
        },

        error => {
          console.log('Login failed', error);
          this.presentToast(error);
        }
      );
    }
    this.loginForm.reset();
  }

  onRegister(email: string, password: string, firstname: string, lastname: string) {
    if (firstname.trim() === '' || lastname.trim() === '') {
      this.presentToast('Firstname and Lastname cannot be blank.');
      return;
    }

      this.authService.register(email, password, firstname, lastname).subscribe(
      data => {
        console.log('Registration successful');
        this.presentToast('Registration successful');
        this.router.navigate(['/tabs/tab1']);
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
