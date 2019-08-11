import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStoreModule } from './login-store/login-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReviewStoreModule } from './review-store/review-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginStoreModule,
    ReviewStoreModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
