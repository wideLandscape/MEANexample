import { Action } from '@ngrx/store';

export enum RootStoreActionTypes {
  LoadRootStores = '[RootStore] Load RootStores'
}

export class LoadRootStores implements Action {
  readonly type = RootStoreActionTypes.LoadRootStores;
}

export type RootStoreActions = LoadRootStores;
