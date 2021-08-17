import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import CATEGORY_ARTICLES_QUERY from "../apollo/queries/category/articles";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { DataService } from "../services/data.service";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  data: any = {};
  // category: any = {};
  category: string = '';
  loading = true;
  errors: any;
  // leftArticlesCount: any;
  // leftArticles: any[];
  rightArticles: any[] = [];
  id: any;

  private queryCategoriesArticles: Subscription = new Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.dataService.getCategory(this.id).subscribe(result => {
        this.rightArticles = result.articles;
        this.category = result.name;
      })
      // this.queryCategoriesArticles = this.apollo.watchQuery({
      //   query: CATEGORY_ARTICLES_QUERY,
      //   variables: {
      //     id: this.id
      //   }
      // })
      //   .valueChanges.subscribe(result => {
      //     this.data = result.data;
      //     this.category = this.data.category.name;
      //     this.rightArticles = this.data.category.articles;
      //     this.loading = result.loading;
      //     this.errors = result.errors;
      //   })
    })
  }

  ngOnDestroy() {
    this.queryCategoriesArticles.unsubscribe();
  }

}
