import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Apollo } from "apollo-angular";
import { gql } from "graphql-tag";
import ARTICLE_QUERY from "../apollo/queries/article/article";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { DataService } from "../services/data.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var UIkit: any;


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  data: any = {};
  comments: any = [];
  loading = true;
  errors: any;
  commentForm = new FormGroup({
    author: new FormControl(),
    content: new FormControl()
  });

  private queryArticle: Subscription = new Subscription;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private dataService: DataService,
    private zone: NgZone,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.getArticle();
    // let time = timer(0, 0);
    // time.subscribe(() => this.getArticle());
    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      content: ['', Validators.required],
    });

    // this.queryArticle = this.apollo
    // .watchQuery({
    //   query: ARTICLE_QUERY,
    //   variables: {
    //     id: this.route.snapshot.paramMap.get("id")
    //   }
    // }).valueChanges.subscribe(result => {
    //   this.data = result.data;
    //   this.loading = result.loading;
    //   this.errors = result.errors
    // });
  }

  getArticle() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.dataService.getArticle(id).subscribe(result => {
        // this.zone.run(() => {
        this.data = result;
        this.comments = this.data.comments.sort((a: any, b: any) =>
          Date.parse(b.published_at) - Date.parse(a.published_at))
        // })
      });
    });
  }

  onCommentCancel() {
    this.commentForm.reset();
  }

  onSubmit() {
    const content = {
      author: this.commentForm.value.author,
      content: this.commentForm.value.content,
      publishedAt: new Date().toISOString(),
      article: this.data.id
    }
    this.dataService.addComment(content).subscribe(res => {
      // console.log(res);
    })
    UIkit.modal('#modal-example').hide();
    this.commentForm.reset();
    this.dataService.getComments().subscribe(res => {
      this.comments = res.sort((a: any, b: any) =>
      Date.parse(b.published_at) - Date.parse(a.published_at))
    })
  }

  ngOnDestroy() {
    this.queryArticle.unsubscribe();
  }

}
