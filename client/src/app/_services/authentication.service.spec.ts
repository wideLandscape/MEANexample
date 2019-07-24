import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
  }
  it('should be created', () => {
    setup();
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
