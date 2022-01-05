import { Action } from '@ngrx/store';
import { UserItem } from '../models/userItem.model';
export enum UserActionTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT"
}
export class SignIn implements Action {
    readonly type = UserActionTypes.SIGN_IN;
  //add an optional payload
  constructor(public payload: UserItem) {}
}

export class SignOut implements Action{
    readonly type = UserActionTypes.SIGN_OUT;
}
export type UserAction = SignOut | SignIn;