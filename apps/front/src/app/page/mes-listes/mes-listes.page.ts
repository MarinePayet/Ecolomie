import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-listes',
  templateUrl: './mes-listes.page.html',
  styleUrls: ['./mes-listes.page.scss'],
})
export class MesListesPage implements OnInit {

  my_lists: any;
  userId!: any;
  loggedIn: boolean;

  constructor(
    private webApiService: WebApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {
    this.my_lists = [];
    this.userId = this.authService.getUserInfo();
    this.loggedIn = false;
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if (!isLoggedIn) {
        console.log('Utilisateur non connecté, redirection vers la connexion.');
        this.router.navigate(['/login']);
      } else {
        this.getMyLists();
        this.authService.getUserInfo().subscribe(
          (userInfo) => {
            this.userId = userInfo.id; // Assurez-vous que 'id' est le bon champ
          },
          (error) => {
            console.log('Erreur lors de la récupération des informations de l\'utilisateur:', error);
          }
        );
      }
    });
  }

  getMyLists() {
    if (this.userId) {
      this.webApiService.getMyLists(this.userId).subscribe((data) => {
        this.my_lists = data['hydra:member'];
        console.log(this.my_lists);
      });
    } else {
      console.error('Utilisateur non trouvé.');
    }
  }

  async deleteList(list: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer cette liste ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.webApiService.deleteList(list.id).subscribe(
              () => {
                console.log('Liste supprimée avec succès.');
                this.presentToast('Liste supprimée avec succès');
                this.getMyLists();
              },
              (error) => {
                console.log(error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  createNewListPrompt() {
    this.alertController
      .create({
        header: 'Nouvelle liste',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Nom de la liste',
          },
        ],
        buttons: [
          {
            text: 'Créer',
            handler: (data) => {
              if (!data.name) {
                console.log('Le nom de la liste ne peut pas être vide.');
                this.presentToast('Le nom de la liste ne peut pas être vide.');
                return;
              }

              if (this.userId) {
                const newList = { name: data.name };
                this.webApiService.createList(newList.name, this.userId).subscribe(
                  () => {
                    console.log('Liste créée avec succès.');
                    this.presentToast('Liste créée avec succès.');
                    this.getMyLists();  // actualise la liste des listes
                  },
                  (error) => {
                    console.log('Erreur lors de la création de la liste:', error);
                    this.presentToast('Erreur lors de la création de la liste.');
                  }
                );
              }
            }
          }
        ]
      })
      .then((prompt) => {
        prompt.present();
      });
  }


  get isLoggedIn() {
    return this.authService.loggedIn$;
  }

  async onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }
}
