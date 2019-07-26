import { TestBed } from '@angular/core/testing';

import { AssignmentsService } from './assignments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssignmentsService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  }

  it('should be created', () => {
    setup();
    const service: AssignmentsService = TestBed.get(AssignmentsService);
    expect(service).toBeTruthy();
  });
});
