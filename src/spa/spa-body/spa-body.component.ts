import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spa-body',
  templateUrl: './spa-body.component.html',
  styleUrls: ['./spa-body.component.scss']
})
export class SpaBodyComponent implements OnInit {
  public title = 'Preparation for the tbank';
  public date = Date.now();

  constructor() {
  }

  ngOnInit(){
  }

}
