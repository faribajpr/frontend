import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



export const appRoutes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  },
  {
    path: 'article/:id',
    component: ArticleComponent
  },
  { 
    path: "category/:id",
    component: CategoryComponent 
  },
  { 
    path: "login",
    component: LoginComponent 
  },
  { 
    path: "register",
    component: RegisterComponent 
  },
  { 
    path: "dashboard",
    component: DashboardComponent 
  }
]
