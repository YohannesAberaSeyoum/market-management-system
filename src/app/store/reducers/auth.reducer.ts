import { createReducer, on } from "@ngrx/store";
import { signIn, signOut } from "../actions/auth.action";
import { UserItem } from "../models/auth.model";

export const initialState:UserItem = {
  isSignedIn: false,
  username: "",
  firstname: "",
  lastname: "",
  password: "",
}

const _userReducer = createReducer(
  initialState,
  on(signIn, (state, {user}) => ({...state, ...user})),
  on(signOut, (state) => ({...state, ...initialState}))
)

export function userReducer(state:any, action:any){
  return _userReducer(state, action)
}