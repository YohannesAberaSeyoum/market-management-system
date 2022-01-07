import { createAction, props } from '@ngrx/store';
import { ErrorTypes } from '../actionTypes/error.type';
import { ErrorModel } from '../models/error.model';

export const errorGet = createAction(
    ErrorTypes.ERROR_GET,
    props<{error: ErrorModel}>()
)

export const errorRemove = createAction(
    ErrorTypes.ERROR_REMOVE
)