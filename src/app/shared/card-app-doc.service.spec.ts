import { TestBed } from '@angular/core/testing';

import { CardAppDocService } from './card-app-doc.service';

describe('CardAppDocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardAppDocService = TestBed.get(CardAppDocService);
    expect(service).toBeTruthy();
  });
});
