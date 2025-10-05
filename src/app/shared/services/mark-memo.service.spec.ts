import { TestBed } from '@angular/core/testing';

import { MarkMemoService } from './mark-memo.service';

describe('MarkMemoService', () => {
  let service: MarkMemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkMemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
