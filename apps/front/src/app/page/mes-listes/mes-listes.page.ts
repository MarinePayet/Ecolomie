import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mes-listes',
  templateUrl: './mes-listes.page.html',
  styleUrls: ['./mes-listes.page.scss'],
})
export class MesListesPage implements OnInit {

  my_lists: any;


  constructor(
    private webApiService: WebApiService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getMyLists();
  }

  getMyLists() {
    this.webApiService.getMyLists().subscribe((data) => {
      this.my_lists = data['hydra:member'];
      console.log(this.my_lists);
    });
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
            text: 'Annuler',
            role: 'cancel',
          },
          {
            text: 'Créer',
            handler: (data) => {
              const newList = { name: data.name };
              this.webApiService.createList(newList.name).subscribe(
                () => {
                  console.log('Liste créée avec succès.');
                  this.presentToast('Liste créée avec succès');
                  this.getMyLists();
                },
                (error) => {
                  console.log(error);
                }
              );
            },
          },
        ],
      })
      .then((prompt) => {
        prompt.present();
      });
  }

}
