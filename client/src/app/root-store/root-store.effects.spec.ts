import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RootStoreEffects } from './root-store.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RootStoreModule } from '.';

describe('RootStoreEffects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: RootStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, RootStoreModule],
      providers: [RootStoreEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(RootStoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});