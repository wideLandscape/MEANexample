import { Action } from '@ngrx/store';

export enum RootStoreActionTypes {
  RequestReviewsByReviewer = '[Home Page - getReviews] Request logged user assigned reviews'
}

export class RequestReviewsByReviewer implements Action {
  readonly type = RootStoreActionTypes.RequestReviewsByReviewer;
}

export type RootStoreActions = RequestReviewsByReviewer;
