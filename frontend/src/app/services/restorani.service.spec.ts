import { TestBed } from '@angular/core/testing';

import { RestoraniService } from './restorani.service';

describe('RestoraniService', () => {
  let service: RestoraniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoraniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
