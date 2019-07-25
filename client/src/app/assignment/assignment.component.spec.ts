import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentComponent } from './assignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { Review } from '../_models/Review';

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

      declarations: [AssignmentComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<
      AssignmentComponent
    > = TestBed.createComponent(AssignmentComponent);
    const component: AssignmentComponent = fixture.componentInstance;
    return { fixture, component };
  }

  it('should create', () => {
    const { fixture, component } = setup();
    component.review = review;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
