import { TestBed } from '@angular/core/testing';

import { CibDataAutoService } from './cib-data-auto.service';

describe('CibDataAutoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CibDataAutoService = TestBed.get(CibDataAutoService);
    expect(service).toBeTruthy();
  });
});
