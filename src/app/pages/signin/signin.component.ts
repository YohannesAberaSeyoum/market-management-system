import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { errorRemove } from 'src/app/store/actions/error.action';
import { UserActionTypes } from 'src/app/store/actionTypes/auth.type';
import { UserItem } from 'src/app/store/models/auth.model';
import { ErrorModel } from 'src/app/store/models/error.model';
import { State } from 'src/app/store/models/state.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  auth: Observable<UserItem> = this.store.select(state => state.user);
  errorObserver: Observable<ErrorModel> = this.store.select(state => state.error);
  error: String = "";

  constructor(private store:Store<State>, private router: Router) { 
  }

  ngOnInit(): void {
    this.errorObserver.subscribe((item) => {
      if(item.msg){
        this.error = item.msg
      }
    })
    this.auth.subscribe((item) => {
      if(item.isSignedIn){
        this.store.dispatch(errorRemove())
        this.router.navigate(["/home"])
      }
    })
  }

  logIn(e:any){
    this.store.dispatch({type: UserActionTypes.SIGNING_IN, payload: e})
  }

}
