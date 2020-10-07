import { TestBed } from '@angular/core/testing';

import { GivenStatusService } from './given-status.service';

describe('GivenStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GivenStatusService = TestBed.get(GivenStatusService);
    expect(service).toBeTruthy();
  });
});
