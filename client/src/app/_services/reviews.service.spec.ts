import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { HttpClientModule } from '@angular/common/http';

describe('ReviewsService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
  }
  it('should be created', () => {
    setup();
    const service: ReviewsService = TestBed.get(ReviewsService);
    expect(service).toBeTruthy();
  });
});
