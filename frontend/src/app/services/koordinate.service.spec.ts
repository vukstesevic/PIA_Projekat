import { TestBed } from '@angular/core/testing';

import { KoordinateService } from './koordinate.service';

describe('KoordinateService', () => {
  let service: KoordinateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KoordinateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
