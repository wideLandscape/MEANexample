import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['user'], rehydrate: true })(
    fromAuth.reducer
  );
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer, {
      metaReducers
    }),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthStoreModule {}
