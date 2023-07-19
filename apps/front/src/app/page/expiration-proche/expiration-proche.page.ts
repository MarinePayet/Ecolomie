import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';


@Component({
  selector: 'app-expiration-proche',
  templateUrl: './expiration-proche.page.html',
  styleUrls: ['./expiration-proche.page.scss'],
})
export class ExpirationProchePage implements OnInit {

  constructor(private webApiService: WebApiService) { }

  ngOnInit() {
  }

}
