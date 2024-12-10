import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofEngagementComponent } from './proof-engagement.component';

describe('ProofEngagementComponent', () => {
  let component: ProofEngagementComponent;
  let fixture: ComponentFixture<ProofEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProofEngagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProofEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
