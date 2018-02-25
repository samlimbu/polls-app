import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import{tokenNotExpired} from 'angular2-jwt';


import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
   // url = 'http://localhost:3000/'; //for testing
    url='';
  authToken: any;
  user: any;  
  constructor(private http:Http) { }

  getTestData(){
      return this.http.get(this.url + 'category')
      .map(res=>res.json());
  }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+'users/register', user, {headers:headers})
    .map(res=>res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+'users/authenticate', user, {headers:headers})
    .map(res=>res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(this.url + 'users/profile',{headers:headers})
    .map(res=>res.json());
  }

  storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
      
  }

  loadToken(){
      const token = localStorage.getItem('id_token');
      this.authToken = token;
  }
  loggedIn(){
     // console.log(tokenNotExpired('id_token'))
     return tokenNotExpired('id_token');
  }

  logout(){
      this.authToken = null;
      this.user = null;
      localStorage.clear();
  }
}
