import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  // updateProductUserStorage() {
  //   // Appelez votre service pour mettre à jour les données
  //   this.webApiService.updateProductUserStorage(this.productUserStorage.id, this.productUserStorage)
  //     .subscribe(
  //       data => {
  //         console.log('Product updated successfully!');
  //         this.productUserStorage = data; // Mettez à jour la propriété avec les nouvelles données du serveur
  //       },
  //       error => {
  //         console.log('There was an error updating the product.');
  //       }
  //     );
  // }

  // updateStorage(storageId: number) {
  //   this.productUserStorage.storage.id = storageId;
  // }

}
