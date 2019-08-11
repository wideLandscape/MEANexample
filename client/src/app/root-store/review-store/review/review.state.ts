import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Review } from './review.model';

export interface State extends EntityState<Review> {
  // additional entities state properties
  isLoading?: boolean;
  error?: string;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>({
  selectId: model => model._id,
  sortComparer: (a: Review, b: Review): number =>
    b._id.toString().localeCompare(a._id.toString())
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  error: null
});
