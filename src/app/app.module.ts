import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NavComponent } from "./nav/nav.component";
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd.module';
import { FilterPipe } from './pipes/filter.pipe';
// import { FormsModule } from '@angular/forms';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ArticlesComponent,
    ArticleComponent,
    CategoryComponent,
    FilterPipe,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          baseUrl: 'http://localhost:1337'
        }
      }
    }),
    RouterModule.forRoot(appRoutes),
    GraphQLModule,
    NgxPaginationModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
