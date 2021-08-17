import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get<any[]>(`${this.apiUrl}/articles`);
  }

  getArticle(id: any){
    return this.http.get<any[]>(`${this.apiUrl}/articles/${id}`)
  }

  getAllCategories() {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getCategory(id:any) {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`);
  }

  getComments(){
    return this.http.get<any>(`${this.apiUrl}/comments`);
  }

  addComment(comment: any) {
    return this.http.post<any>(`${this.apiUrl}/comments`, comment);
  }


}
