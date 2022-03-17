import { Component, OnInit } from '@angular/core';
import {FondCardsService} from "../../fond-cards.service";
import {cards, IUser} from "../../../spa/interfaces";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-personal-area',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.scss']
})
export class HomeAuthComponent implements OnInit {
  public user: any;
  private id: number;
  private urlSignupUser: string = 'http://localhost:3000/signupUsers';

  constructor(private http: HttpClient, public peopleService: FondCardsService, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.user = this.http.get<IUser[]>(this.urlSignupUser)
      .subscribe(res => {
        this.user = res.find((a: IUser) => {
          return a.id === this.id;
        });
        console.log(this.user);
      }, err => {
        alert('Something went wrong')
      });
    console.log(this.user + 'ofooof')
  }



}
