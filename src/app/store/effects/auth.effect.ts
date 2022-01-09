import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from "../../services/auth.service";
import { signIn } from "../actions/auth.action";
import { errorGet } from "../actions/error.action";
import { finishEnd } from "../actions/finish.action";
import { UserActionTypes } from "../actionTypes/auth.type";
import { UserLogin, UserRegister } from "../models/auth.model";

@Injectable()
export class AuthEffect{
    authenticate = createEffect(() => 
        this.actions.pipe(
            ofType(UserActionTypes.SIGNING_IN),
            exhaustMap((action:{type: string, payload: UserLogin}) =>
                    this.authService.login(action.payload).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            return signIn({user: {
                                isSignedIn: true,
                                username: user.username,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                password: user.password
                            }})
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    registering = createEffect(() => 
        this.actions.pipe(
            ofType(UserActionTypes.REGISTERING),
            exhaustMap((action:{type: string, payload: UserRegister}) =>
                    this.authService.register(action.payload).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    constructor(private actions: Actions, private authService: AuthService) {
        
    }
}