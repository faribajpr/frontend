import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Apollo } from "apollo-angular";
import { gql } from "graphql-tag";
import ARTICLES_QUERY from "../apollo/queries/article/articles";
import { Subscription } from "rxjs";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  data: any = {};
  loading = true;
  errors: any;
  articles: any[] = [];
  page = 1;
  count = 0;
  tableSize = 10;

  private queryArticles: Subscription = new Subscription;

  constructor(private apollo: Apollo, private dataService: DataService) { }

  ngOnInit(): void {
    
    this.fetchArticles();
    // this.queryArticles = this.apollo.watchQuery({
    //   query: ARTICLES_QUERY,
    //   variables: {
    //     // start: 0,
    //     // limit: 2,
    //   }
    // })
    //   .valueChanges.subscribe(result => {
    //     this.data = result.data;
    //     this.articles = this.data.articles;
    //     this.loading = result.loading;
    //     this.errors = result.errors;
    //   })
  }

  fetchArticles() {
    this.dataService.getAllArticles().subscribe((result: any[]) => {
      this.articles = result.sort((a: { id: number; },b: { id: number; }) => {
        return a.id - b.id
      });
    });
  }

  onTableDataChange(event:any){
    console.log(event)
    this.page = event;
    this.fetchArticles();
  }  


  ngOnDestroy() {
    this.queryArticles.unsubscribe();
  }

}
