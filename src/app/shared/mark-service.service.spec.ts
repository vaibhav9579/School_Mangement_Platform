import { TestBed } from '@angular/core/testing';

import { MarkServiceService } from './mark-service.service';

describe('MarkServiceService', () => {
  let service: MarkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
