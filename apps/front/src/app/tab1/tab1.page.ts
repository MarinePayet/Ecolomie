import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private configUrl = 'https://127.0.0.1:8000/api';
  categories: any;

​
  constructor( private http: HttpClient){
    

  }

  getCategory(){
    this.http.get<any>(`${this.configUrl}/categories`).subscribe(data => {
      this.categories = data['hydra:member'];
});
  };
  ​
  ngOnInit() {
    this.getCategory();
  }
}
