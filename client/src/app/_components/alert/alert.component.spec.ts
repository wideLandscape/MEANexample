import {
  async,
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService, Message } from 'src/app/_services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Observer } from 'rxjs';

describe('AlertComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AlertComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<AlertComponent> = TestBed.createComponent(
      AlertComponent
    );
    const component: AlertComponent = fixture.componentInstance;
    const alertService: AlertService = fixture.debugElement.injector.get(
      AlertService
    );

    return { fixture, component, alertService };
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should display a message', fakeAsync(() => {
    const { fixture, alertService } = setup();
    const mockMessage: Message = { type: 'success', text: 'Ciao' };
    spyOn(alertService, 'getMessage').and.returnValue(
      Observable.create((observer: Observer<Message>) => {
        observer.next(mockMessage);
        return observer;
      })
    );

    tick();

    fixture.detectChanges();
    const alertComponentElement = fixture.debugElement.nativeElement;
    const alertMessage = alertComponentElement.querySelector('div');
    expect(alertMessage.textContent.trim()).toContain('Ciao');
  }));

  it('close() should hide', () => {
    const { fixture, component } = setup();
    component.close();
    fixture.detectChanges();
    const alertComponentElement = fixture.debugElement.nativeElement;
    const alertMessage = alertComponentElement.querySelector('div');
    expect(alertMessage).toBeFalsy();
  });
});
