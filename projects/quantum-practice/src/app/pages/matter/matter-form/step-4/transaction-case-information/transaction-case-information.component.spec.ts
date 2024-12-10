import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCaseInformationComponent } from './transaction-case-information.component';

describe('TransactionCaseInformationComponent', () => {
  let component: TransactionCaseInformationComponent;
  let fixture: ComponentFixture<TransactionCaseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCaseInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionCaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
