import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteControlleurComponent } from './compte-controlleur.component';

describe('CompteControlleurComponent', () => {
  let component: CompteControlleurComponent;
  let fixture: ComponentFixture<CompteControlleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteControlleurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompteControlleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
