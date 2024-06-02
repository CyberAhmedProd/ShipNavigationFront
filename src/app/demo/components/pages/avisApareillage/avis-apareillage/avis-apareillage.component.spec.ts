import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisApareillageComponent } from './avis-apareillage.component';

describe('AvisApareillageComponent', () => {
  let component: AvisApareillageComponent;
  let fixture: ComponentFixture<AvisApareillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisApareillageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvisApareillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
