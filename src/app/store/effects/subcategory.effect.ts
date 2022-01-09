import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { SubcategoryService } from "src/app/services/subcategory.service";
import { errorGet } from "../actions/error.action";
import { subcategoryFetchAll } from "../actions/subcategory.action";
import { SubcategoryTypes } from "../actionTypes/subcategory.type";

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

    constructor(private actions: Actions, private subcategoryservice: SubcategoryService) {
        
    }
}