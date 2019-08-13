import { Action } from '@ngrx/store';

export enum RootStoreActionTypes {
  RequestReviewsByReviewer = '[Home Page - ngOnInit] Request logged user assigned reviews',
  RefreshReviewsByReviewer = '[Home Page - successForm] Refresh logged user assigned reviews'
}

export class RequestReviewsByReviewer implements Action {
  readonly type = RootStoreActionTypes.RequestReviewsByReviewer;
}
export class RefreshReviewsByReviewer implements Action {
  readonly type = RootStoreActionTypes.RefreshReviewsByReviewer;
}

export type RootStoreActions =
  | RequestReviewsByReviewer
  | RefreshReviewsByReviewer;
