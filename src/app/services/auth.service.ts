import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserLoginBody {
    username: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

      login(userloginBody: UserLoginBody) {
        const url = 'http://localhost:8091/user/login';
        return this.http.post(url, userloginBody)
    } 
}
