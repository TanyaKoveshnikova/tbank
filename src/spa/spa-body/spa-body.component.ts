import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spa-body',
  templateUrl: './spa-body.component.html',
  styleUrls: ['./spa-body.component.scss']
})
export class SpaBodyComponent implements OnInit {
  title = 'Preparation for the tbank';
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
