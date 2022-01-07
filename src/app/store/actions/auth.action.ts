import { createAction, props } from '@ngrx/store';
import { UserActionTypes } from '../actionTypes/auth.type';
import { UserItem } from '../models/auth.model';


export const signIn = createAction(
  UserActionTypes.SIGN_IN,
  props<{user: UserItem}>()
)

export const signOut = createAction(
  UserActionTypes.SIGN_OUT
)