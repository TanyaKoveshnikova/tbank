import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spa-body',
  templateUrl: './spa-body.component.html',
  styleUrls: ['./spa-body.component.scss']
})
export class SpaBodyComponent implements OnInit {
  public title = 'Preparation for the tbank';
  public data?:String;

  constructor() { }

  ngOnInit(){
    let day = new Date().getDay();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    this.data = `${day}.${month}.${year}`
  }

}
