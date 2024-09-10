import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerInformationComponent } from './payer-information.component';

describe('PayerInformationComponent', () => {
  let component: PayerInformationComponent;
  let fixture: ComponentFixture<PayerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
