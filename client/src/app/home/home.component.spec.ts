import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { AlertComponent } from '../_components/alert/alert.component';
import { AssignmentsService } from '../_services/assignments.service';
import { Observable, Observer } from 'rxjs';
import { Employee } from '../_models/employee';
const baseEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: false
};
describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [HomeComponent, AlertComponent],
      providers: [AppComponent, AssignmentsService]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.debugElement.componentInstance;

    const appComponent = fixture.debugElement.injector.get(AppComponent);
    appComponent.currentEmployee = baseEmployee;
    component.currentEmployee = appComponent.currentEmployee;
    const mockAssignments: any[] = [
      {
        _id: '1',
        review_id: {
          employee: baseEmployee,
          _id: '1'
        },
        employee_id: '1',
        results: [],
        done: false
      },
      {
        _id: '2',
        employee_id: '1',
        results: [],
        done: false
      }
    ];
    const assignmentsService = fixture.debugElement.injector.get(
      AssignmentsService
    );

    spyOn(assignmentsService, 'byReviewer').and.returnValue(
      Observable.create((observer: Observer<any[]>) => {
        observer.next(mockAssignments);
        return observer;
      })
    );
    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
