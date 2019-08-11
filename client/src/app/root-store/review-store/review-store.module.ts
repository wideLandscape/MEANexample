import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromReview from './review/review.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReviewEffects } from './review/review.effects';
// ng generate module root-store/review-store --flat false
// ng generate entity root-store/review-store/Review --flat false -m review-store
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReview.reviewsFeatureKey, fromReview.reducer),
    EffectsModule.forFeature([ReviewEffects])
  ],
  providers: [ReviewEffects]
})
export class ReviewStoreModule {}
