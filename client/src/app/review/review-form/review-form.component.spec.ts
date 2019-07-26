import { async, TestBed } from '@angular/core/testing';

import { ReviewFormComponent } from './review-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
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
