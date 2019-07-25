import { async, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [EmployeeComponent, EmployeeFormComponent]
    }).compileComponents();
  }));

  function setup() {
    // TODO: add fixture for EmployeesService
    const fixture = TestBed.createComponent(EmployeeComponent);
    const component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
