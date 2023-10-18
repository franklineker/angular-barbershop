import { TestBed } from '@angular/core/testing';

import Oauth2ServiceService from './oauth2.service';

describe('Oauth2ServiceService', () => {
  let service: Oauth2ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth2ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
