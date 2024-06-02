import { TestBed } from '@angular/core/testing';

import { EquipageService } from './equipage.service';

describe('EquipageService', () => {
  let service: EquipageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
