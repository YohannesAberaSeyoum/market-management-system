import { createAction } from '@ngrx/store';
import { FinishTypes } from '../actionTypes/finish.type';

export const finishStart = createAction(
    FinishTypes.FINISH_START
)

export const finishEnd = createAction(
    FinishTypes.FINISH_END
)