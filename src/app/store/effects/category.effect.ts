import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CategoryService } from "src/app/services/category.service";
import { categoryAdd, categoryDelete, categoryFetch, categoryFetchAll, categoryUpdate } from "../actions/category.action";
import { errorGet } from "../actions/error.action";
import { finishEnd } from "../actions/finish.action";
import { CategoryTypes } from "../actionTypes/category.type";
import { State } from "../models/state.model";

@Injectable()
export class CategoryEffect{
    fetchAll = createEffect(() => 
        this.actions.pipe(
            ofType(CategoryTypes.FETCHING_ALL),
            exhaustMap((action:{type: string, payload: any}) =>
                    {return this.categoryservice.fetchAll(action.payload.username).pipe(
                    map((user: any) => {
                        if (user.success){
                            console.log("Please", user.data)
                            return categoryFetchAll({category: user.data});
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )}
            )
        )   
    )

    addCategory = createEffect(() => 
        this.actions.pipe(
            ofType(CategoryTypes.ADDING),
            exhaustMap((action:{type: string, payload: any}) => this.categoryservice.addCategory(action.payload.body).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            this.store.dispatch(categoryAdd({category: action.payload.body}));
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    fetchCategory = createEffect(() => 
        this.actions.pipe(
            ofType(CategoryTypes.FETCHING),
            exhaustMap((action:{type: string, payload: any}) => this.categoryservice.getCategory(action.payload.username,action.payload.param).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            this.store.dispatch(categoryFetch({category: {username: user.username, name: user.name, description: user.description}}));
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    updateCategory = createEffect(() => 
        this.actions.pipe(
            ofType(CategoryTypes.UPDATING),
            exhaustMap((action:{type: string, payload: any}) => this.categoryservice.updateCategory(action.payload.body,action.payload.param.name).pipe(
                    map((user: any) => {
                        if (user.success){
                            this.store.dispatch(categoryUpdate({category: action.payload.body, pcategory: action.payload.param.name}));
                             return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    deleteProduct = createEffect(() => 
        this.actions.pipe(
            ofType(CategoryTypes.DELETING),
            exhaustMap((action:{type: string, payload: any}) => this.categoryservice.deleteCategory(action.payload.username, action.payload.param).pipe(
                    map((user: any) => {
                        if (user.success){
                            this.store.dispatch(categoryDelete({category: action.payload.param.name}));
                             return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    constructor(private actions: Actions, private categoryservice: CategoryService, private store: Store<State>) {
        
    }
}