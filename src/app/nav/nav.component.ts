import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import { Subscription } from "rxjs";
import { Article } from '../interfaces/article';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: any = [];
  loading = true;
  errors: any;
  searchText = '';
  articles: Article[] = [];
  currentUser: boolean = false;


  private queryCategories: Subscription = new Subscription;

  constructor(
    private apollo: Apollo,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService) {
      this.authService.currentUser.subscribe(user => {
        // console.log(user)
        this.currentUser = (Object.keys(user).length != 0) ? true : false;
      })
  }

  ngOnInit(): void {
    // this.queryCategories = this.apollo
    //   .watchQuery({
    //     query: CATEGORIES_QUERY
    //   })
    //   .valueChanges.subscribe(result => {
    //     this.data = result.data;
    //     this.loading = result.loading;
    //     this.errors = result.errors;
    //   });
    this.dataService.getAllCategories().subscribe(cat => {
      this.categories = cat;
    })

    this.dataService.getAllArticles().subscribe(result => {
      this.articles = result;
    });

  }

  clear() {
    this.searchText = '';
  }

  navToLogin() {
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.queryCategories.unsubscribe();
  }


}