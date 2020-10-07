import { TestBed } from '@angular/core/testing';

import { CardapplicationService } from './cardapplication.service';

describe('CardapplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardapplicationService = TestBed.get(CardapplicationService);
    expect(service).toBeTruthy();
  });
});
