import { async, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from 'src/app/_services/employees.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Employee } from 'src/app/_models/employee';
const baseEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: false
};
describe('EmployeeFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [EmployeeFormComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(EmployeeFormComponent);
    const component = fixture.debugElement.componentInstance;
    const employeesService: EmployeesService = fixture.debugElement.injector.get(
      EmployeesService
    );

    // TODO: how to test Angular Input('employee') setter ????
    //  component.editableEmployee = baseEmployee;
    //  fixture.detectChanges();
    return { fixture, component, employeesService };
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
