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
    return this.authService.loggedIn$;
  }

  get email() {
    return this.loginForm.get('email');
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
      this.presentToast('Veuillez remplir le formulaire correctement.');
      return;
    }

    const { email, password, firstname, lastname } = this.loginForm.value;

    if (this.isRegistering) {
      this.onRegister(email, password, firstname, lastname);
    } else {
      this.authService.login(email, password).subscribe(
        data => {
          console.log('Connexion réussie');
          this.presentToast('Connexion réussie');
          this.router.navigate(['/tabs/tab1']);
        },
        error => {
          console.log('Échec de la connexion', error);
          this.handleError(error, 'Échec de la connexion');
        }
      );
    }

    this.loginForm.reset();
  }

  onRegister(email: string, password: string, firstname: string, lastname: string) {
    if (!firstname.trim() || !lastname.trim()) {
      this.presentToast('Le prénom et le nom ne peuvent pas être vides.');
      return;
    }

    this.authService.register(email, password, firstname, lastname).subscribe(
      data => {
        console.log('Inscription réussie');
        this.presentToast('Inscription réussie');
        this.router.navigate(['/tabs/tab1']);
      },
      error => {
        console.log("Échec de l'inscription', error");
        this.handleError(error, "Échec de l'inscription");
      }
    );
  }

  onLogout() {
    this.authService.logout();
    console.log('Déconnexion réussie');
    this.presentToast('Déconnexion réussie');
    this.router.navigate(['/login']);
  }

  private handleError(error: any, defaultErrorMsg: string) {
    let errorMsg = error && error.message ? error.message : defaultErrorMsg;
    this.presentToast(errorMsg);
  }
}
