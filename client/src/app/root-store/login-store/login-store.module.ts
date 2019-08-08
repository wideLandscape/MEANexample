import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { LoginStoreEffects } from './effects';
import { featureReducer } from './reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['user'], rehydrate: true })(featureReducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('login', featureReducer, { metaReducers }),
    EffectsModule.forFeature([LoginStoreEffects])
  ],
  providers: [LoginStoreEffects]
})
export class LoginStoreModule {}
