import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { btn } from 'src/app/Models/button';
import { inp } from 'src/app/Models/input';
import { errorRemove } from 'src/app/store/actions/error.action';
import { finishStart } from 'src/app/store/actions/finish.action';
import { UserActionTypes } from 'src/app/store/actionTypes/auth.type';
import { ErrorModel } from 'src/app/store/models/error.model';
import { State } from 'src/app/store/models/state.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorObserver: Observable<ErrorModel> = this.store.select(state => state.error);
  finishObserver: Observable<Boolean> = this.store.select(state => state.finished);
  username: String = "";
  firstname: String = "";
  lastname: String = "";
  password: String = "";
  error: String = "";

  usernameInput: inp = {
    label: "Username",
    name: "username",
    placeholder: "Enter Your username"
  }

  firstnameInput: inp = {
    label: "Firstname",
    name: "firstname",
    placeholder: "Enter Your firstname"
  }

  lastnameInput: inp = {
    label: "Lastname",
    name: "lastname",
    placeholder: "Enter Your lastname"
  }

  passwordInput: inp = {
    label: "Password",
    name: "password",
    placeholder: "Enter Your password",
    type: "password"
  }

  login_btn: btn = {
    text: "Login",
    color: "success",
  }

  register_btn: btn = {
    text: "Register",
    color: "primary",
    sm: "12"
  }

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(errorRemove())
    this.errorObserver.subscribe((item) => {
      if(item.msg){
        this.error = item.msg
      }
    })
    this.finishObserver.subscribe((item) => {
      if(item){
        this.store.dispatch(errorRemove())
        this.store.dispatch(finishStart())
        this.router.navigate(["/signin"])
      }
    })
  }

  register(){
    this.store.dispatch({type: UserActionTypes.REGISTERING, payload: {firstname: this.firstname, lastname: this.lastname,username: this.username, password: this.password}})
  }

  toLogin = () => {
    this.store.dispatch(errorRemove())
    this.router.navigate(["/signin"])
  }

}
