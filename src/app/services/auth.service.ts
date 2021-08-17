import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  login(email:string, password:string) {
    return this.http.post<any>(`${this.apiUrl}/auth/local`, {
      identifier: email,
      password: password,
    }).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/local/register`, {
      username: username,
      email: email,
      password: password,
      role: 'Reader'
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(JSON.parse('{}'))
  }
}
