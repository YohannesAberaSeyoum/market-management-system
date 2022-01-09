import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { SubcategoryService } from "src/app/services/subcategory.service";
import { errorGet } from "../actions/error.action";
import { finishEnd } from "../actions/finish.action";
import { subcategoryAdd, subcategoryDelete, subcategoryFetch, subcategoryFetchAll, subcategoryUpdate } from "../actions/subcategory.action";
import { SubcategoryTypes } from "../actionTypes/subcategory.type";
import { State } from "../models/state.model";

@Injectable()
export class SubcategoryEffect{
    fetchAll = createEffect(() => 
        this.actions.pipe(
            ofType(SubcategoryTypes.FETCHING_ALL),
            exhaustMap((action:{type: string, payload: any}) => this.subcategoryservice.fetchAll(action.payload.username).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            return subcategoryFetchAll({subcategory: user.data});
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    addSubcategory = createEffect(() => 
        this.actions.pipe(
            ofType(SubcategoryTypes.ADDING),
            exhaustMap((action:{type: string, payload: any}) => this.subcategoryservice.addSubcategory(action.payload.body).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            this.store.dispatch(subcategoryAdd({subcategory: action.payload.body}));
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    fetchSubcategory = createEffect(() => 
        this.actions.pipe(
            ofType(SubcategoryTypes.FETCHING),
            exhaustMap((action:{type: string, payload: any}) => this.subcategoryservice.getSubcategory(action.payload.username,action.payload.param).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            this.store.dispatch(subcategoryFetch({subcategory: {username: action.payload.username, name: user.name, category_name: user.category_name, description: user.description}}));
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    updateSubcategory = createEffect(() => 
        this.actions.pipe(
            ofType(SubcategoryTypes.UPDATING),
            exhaustMap((action:{type: string, payload: any}) => this.subcategoryservice.updateSubcategory(action.payload.body,action.payload.param).pipe(
                    map((user: any) => {
                        if (user.success){
                            this.store.dispatch(subcategoryUpdate({subcategory: action.payload.body, psubcategory: `${action.payload.param.category}#${action.payload.param.name}`}));
                             return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    deleteSubcategory = createEffect(() => 
        this.actions.pipe(
            ofType(SubcategoryTypes.DELETING),
            exhaustMap((action:{type: string, payload: any}) => this.subcategoryservice.deleteSubcategory(action.payload.username, action.payload.param).pipe(
                    map((user: any) => {
                        if (user.success){
                            this.store.dispatch(subcategoryDelete({category: action.payload.param.category, subcategory: action.payload.param.name}));
                             return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    constructor(private actions: Actions, private subcategoryservice: SubcategoryService, private store: Store<State>) {
        
    }
}