import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiForListService } from './api-for-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newproduct-for-list',
  templateUrl: './newproduct-for-list.page.html',
  styleUrls: ['./newproduct-for-list.page.scss'],
})
export class NewproductForListPage implements OnInit {
  product!: {
    quantity: number;
    category: string;
    name: string;
  };


  categories: any[] = [];
  idList?: number

  constructor(
    private apiForListService: ApiForListService,
    private toastController: ToastController,
    private route: ActivatedRoute)
      {
        this.product = {
          quantity: 0,
          category: '',
          name: '',
        };
      }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idList = Number(params.get('id'));
      console.log(this.idList);
    });
  }



  async addProduct() {

    this.product.category = '/api/categories/' + this.product.category;

    try {
      const productResponse = await this.apiForListService.addProduct(this.product).toPromise();
      console.log("productResponse : ")
      console.log(productResponse);

      const myListData = {
        quantity: this.product.quantity,
        is_product_buy: false,
        productForList: '/api/product_for_lists/' + productResponse.id,
        myList: '/api/my_lists/' + this.idList,
        updated_at: '2023-08-15 08:48:34',
        created_at: '2023-08-15 08:48:34',
        text: 'bliblablou',


      };
      console.log("myListData : ")
      console.log(myListData);

      const myListResponse = await this.apiForListService.addMyListWithProduct(myListData).toPromise();

      const toast = await this.toastController.create({
        message: 'Produit ajouté avec succès.',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } catch (error) {

      const toast = await this.toastController.create({
        message: 'Une erreur est survenue lors de l\'ajout du produit.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

    getCategories() {
      this.apiForListService.getCategories().subscribe((data) => {
        this.categories = data['hydra:member'];
        console.log(this.categories)
      });

    }

    ionViewWillEnter() {
      this.getCategories();

    }
}


