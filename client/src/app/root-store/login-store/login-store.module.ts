import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginStoreEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('login', featureReducer),
    EffectsModule.forFeature([LoginStoreEffects])
  ],
  providers: [LoginStoreEffects]
})
export class LoginStoreModule {}
