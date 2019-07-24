import { TestBed } from '@angular/core/testing';

import { AssignmentsService } from './assignments.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssignmentsService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
  }

  it('should be created', () => {
    setup();
    const service: AssignmentsService = TestBed.get(AssignmentsService);
    expect(service).toBeTruthy();
  });
});
