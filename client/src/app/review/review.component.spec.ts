import { async, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReviewFormComponent } from './review-form/review-form.component';

describe('ReviewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ReviewComponent, ReviewFormComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(ReviewComponent);
    const component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
