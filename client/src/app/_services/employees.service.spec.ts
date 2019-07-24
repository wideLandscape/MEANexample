import { TestBed } from '@angular/core/testing';

import { EmployeesService } from './employees.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmployeesService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
  }

  it('should be created', () => {
    setup();
    const service: EmployeesService = TestBed.get(EmployeesService);
    expect(service).toBeTruthy();
  });
});
