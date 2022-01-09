import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CategoryService } from "src/app/services/category.service";
import { categoryFetchAll } from "../actions/category.action";
import { errorGet } from "../actions/error.action";
import { CategoryTypes } from "../actionTypes/category.type";

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

    constructor(private actions: Actions, private categoryservice: CategoryService) {
        
    }
}