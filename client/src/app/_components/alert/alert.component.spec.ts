import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from 'src/app/_services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
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
});
