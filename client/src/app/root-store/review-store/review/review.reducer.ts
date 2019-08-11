import { ReviewActions, ReviewActionTypes } from './review.actions';
import { initialState, State } from './review.state';

export const reviewsFeatureKey = 'reviews';

export function reducer(state = initialState, action: ReviewActions): State {
  switch (action.type) {
    /*
    case ReviewActionTypes.AddReview: {
      return adapter.addOne(action.payload.review, state);
    }

    case ReviewActionTypes.UpsertReview: {
      return adapter.upsertOne(action.payload.review, state);
    }

    case ReviewActionTypes.AddReviews: {
      return adapter.addMany(action.payload.reviews, state);
    }

    case ReviewActionTypes.UpsertReviews: {
      return adapter.upsertMany(action.payload.reviews, state);
    }

    case ReviewActionTypes.UpdateReview: {
      return adapter.updateOne(action.payload.review, state);
    }

    case ReviewActionTypes.UpdateReviews: {
      return adapter.updateMany(action.payload.reviews, state);
    }

    case ReviewActionTypes.DeleteReview: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ReviewActionTypes.DeleteReviews: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ReviewActionTypes.LoadReviews: {
      return adapter.addAll(action.payload.reviews, state);
    }

    case ReviewActionTypes.ClearReviews: {
      return adapter.removeAll(state);
    }
*/
    default: {
      return state;
    }
  }
}
