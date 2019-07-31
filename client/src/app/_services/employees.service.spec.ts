import { TestBed } from '@angular/core/testing';

import { EmployeesService } from './employees.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeesService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  }

  it('should be created', () => {
    setup();
    const service: EmployeesService = TestBed.get(EmployeesService);
    expect(service).toBeTruthy();
  });
});
