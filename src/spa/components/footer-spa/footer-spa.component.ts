import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-spa',
  templateUrl: './footer-spa.component.html',
  styleUrls: ['./footer-spa.component.scss']
})
export class FooterSpaComponent implements OnInit {
  public title = 'Preparation for the tbank';
  public date = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
