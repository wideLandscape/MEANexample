import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReviewsService', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  }
  it('should be created', () => {
    setup();
    const service: ReviewsService = TestBed.get(ReviewsService);
    expect(service).toBeTruthy();
  });
});
