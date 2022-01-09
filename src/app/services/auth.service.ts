import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../store/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "";

  constructor(private http:HttpClient) {
    this.url = "http://localhost:8091/user/"
   }

      login(userloginBody: UserLogin) {
        return this.http.post(this.url + "login", userloginBody)
    } 

    register(userRegisterBody: UserRegister){
      return this.http.post(this.url + "register",userRegisterBody)
    }
}
