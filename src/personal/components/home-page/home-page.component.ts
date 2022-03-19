import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../spa/interfaces";
import {FondCardsService} from "../../fond-cards.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public user?: IUser;

  constructor(public peopleService: FondCardsService, public activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.peopleService.userService;
  }

}
