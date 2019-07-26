import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentComponent } from './assignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { Review } from '../_models/Review';
import { AssignmentsService } from '../_services/assignments.service';
import { Router } from '@angular/router';
import { EmployeesService } from '../_services/employees.service';
import { Observable, Observer, of } from 'rxjs';

class MockRouter {
  events = of(null);
  routerState = { root: undefined };
  navigate(path) {}
}

const baseEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: false
};

const review: Review = {
  // tslint:disable-next-line: variable-name
  _id: '1',
  employee: baseEmployee,
  questions: [],
  active: true,
  assignments: []
};

describe('AssignmentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [{ provide: Router, useClass: MockRouter }],
      declarations: [AssignmentComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<
      AssignmentComponent
    > = TestBed.createComponent(AssignmentComponent);
    const component: AssignmentComponent = fixture.componentInstance;
    const assignmentsService: AssignmentsService = fixture.debugElement.injector.get(
      AssignmentsService
    );
    assignmentsService.current = review;
    component.review = assignmentsService.current;
    const mockReviewers: any[] = [
      {
        _id: '1',
        review_id: '1',
        employee_id: baseEmployee,
        results: [],
        done: false
      },
      {
        _id: '2',
        employee_id: baseEmployee,
        results: [],
        done: false
      }
    ];
    spyOn(assignmentsService, 'reviewers').and.returnValue(
      Observable.create((observer: Observer<any[]>) => {
        observer.next(mockReviewers);
        return observer;
      })
    );
    const mockEmployees: any[] = [
      baseEmployee,
      baseEmployee,
      baseEmployee,
      baseEmployee
    ];

    const employeesService: EmployeesService = fixture.debugElement.injector.get(
      EmployeesService
    );

    spyOn(employeesService, 'getAll').and.returnValue(
      Observable.create((observer: Observer<any[]>) => {
        observer.next(mockEmployees);
        return observer;
      })
    );
    const router = TestBed.get(Router);
    spyOn(router, 'navigate').and.returnValue(null);

    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
