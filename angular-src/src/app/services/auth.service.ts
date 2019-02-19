import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  task: any;
  isDev;

  constructor(private http: Http) {
    this.isDev = false;  // Change to false before deployment
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  addTask(task) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/addtask', task, {headers: headers})
      .map(res => res.json());
  }

  getTask() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/showtask', {headers: headers})
      .map(res => res.json());
  }

  updateTask(id, info){
    let headers = new Headers();
    console.log("update task auth service " +  JSON.stringify(info));
    var infoo = info[0];
    return this.http.put('users/'+id, infoo,{headers: headers})
        .map(res => res.json());
  }
  
  deletetask(task_id)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('users/' +task_id,{headers: headers})
     .map(res => res.json());
  } 

  detailtask(task_id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/find/' +task_id, {headers: headers})
      .map(res => res.json());
  }
}
