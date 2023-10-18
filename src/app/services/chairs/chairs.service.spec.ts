import { TestBed } from '@angular/core/testing';

import { ChairsService } from './chairs.service';

describe('ChairsService', () => {
  let service: ChairsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChairsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
