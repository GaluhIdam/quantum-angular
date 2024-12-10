import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEntityComponent } from './company-entity.component';

describe('CompanyEntityComponent', () => {
  let component: CompanyEntityComponent;
  let fixture: ComponentFixture<CompanyEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyEntityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
