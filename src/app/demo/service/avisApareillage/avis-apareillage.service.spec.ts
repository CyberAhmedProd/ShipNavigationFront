import { TestBed } from '@angular/core/testing';

import { AvisApareillageService } from './avis-apareillage.service';

describe('AvisApareillageService', () => {
  let service: AvisApareillageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisApareillageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
