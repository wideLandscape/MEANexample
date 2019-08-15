import { createAction } from '@ngrx/store';

export const requestReviewsByReviewer = createAction(
  '[Home Page - ngOnInit] Request logged user assigned reviews'
);
export const refreshReviewsByReviewer = createAction(
  '[Home Page - successForm] Refresh logged user assigned reviews'
);
