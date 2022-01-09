import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductService } from "src/app/services/product.service";
import { errorGet } from "../actions/error.action";
import { finishEnd } from "../actions/finish.action";
import { productAdd, productDelete, productFetch, productFetchAll, productUpdate } from "../actions/product.action";
import { ProductTypes } from "../actionTypes/product.type";
import { State } from "../models/state.model";

@Injectable()
export class ProductEffect{
    fetchAll = createEffect(() => 
        this.actions.pipe(
            ofType(ProductTypes.FETCHING_ALL),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.fetchAll(action.payload.username).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            return productFetchAll({product: user.data});
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )
    fetchByCategory = createEffect(() => 
        this.actions.pipe(
            ofType(ProductTypes.FETCHING_BY_CATEGORY),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.fetchByCategory(action.payload.username, action.payload.param.category).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            return productFetchAll({product: user.data});
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    fetchBySubcategory = createEffect(() => 
        this.actions.pipe(
            ofType(ProductTypes.FETCHING_BY_SUBCATEGORY),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.fetchBySubcategory(action.payload.username, action.payload.param).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            return productFetchAll({product: user.data});
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    addProduct = createEffect(() => 
        this.actions.pipe(
            ofType(ProductTypes.ADDING),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.addProduct(action.payload.body).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            this.store.dispatch(productAdd({product: action.payload.body}));
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    fetchProduct = createEffect(() => 
        this.actions.pipe(
            ofType(ProductTypes.FETCHING),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.getProduct(action.payload.username,action.payload.param).pipe(
                    map((user: any) => {
                        console.log("User", user)
                        if (user.success){
                            this.store.dispatch(productFetch({product: {name: user.name, category_name: user.category_name, subcategory_name: user.subcategory_name, description: user.description, quantity: user.quantity}}));
                            return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    updateProduct = createEffect(() => 
        this.actions.pipe(
            ofType(ProductTypes.UPDATING),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.updateProduct(action.payload.body,action.payload.param).pipe(
                    map((user: any) => {
                        if (user.success){
                            this.store.dispatch(productUpdate({product: action.payload.body, pproduct: `${action.payload.param.category}#${action.payload.param.subcategory}#${action.payload.param.name}`}));
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
            ofType(ProductTypes.DELETING),
            exhaustMap((action:{type: string, payload: any}) => this.productservice.deleteProduct(action.payload.username, action.payload.param).pipe(
                    map((user: any) => {
                        if (user.success){
                            this.store.dispatch(productDelete({category: action.payload.param.category, subcategory: action.payload.param.subcategory, product: action.payload.param.name}));
                             return finishEnd()
                        }
                        return errorGet({error: {msg: user.error}})}),
                    catchError(() => of(errorGet({error: {msg: "Could not connect"}})))
                )
            )
        )   
    )

    constructor(private actions: Actions, private productservice: ProductService, private store: Store<State>) {
        
    }
}