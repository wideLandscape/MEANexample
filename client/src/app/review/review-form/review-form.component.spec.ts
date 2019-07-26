import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormComponent } from './review-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ReviewFormComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(ReviewFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
