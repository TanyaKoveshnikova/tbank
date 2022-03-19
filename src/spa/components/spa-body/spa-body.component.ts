import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'spa-body',
  templateUrl: './spa-body.component.html',
  styleUrls: ['./spa-body.component.scss']
})
export class SpaBodyComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(){
    this.router.navigate(['/hi'])
  }

}
