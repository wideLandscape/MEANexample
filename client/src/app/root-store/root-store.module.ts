import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReviewStoreModule } from './review-store/review-store.module';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { RootStoreEffects } from './root-store.effects';
import { EmployeeStoreModule } from './employee-store/employee-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReviewStoreModule,
    AuthStoreModule,
    EmployeeStoreModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([RootStoreEffects])
  ]
})
export class RootStoreModule {}
