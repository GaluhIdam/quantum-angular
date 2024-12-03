import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGenericDefaultComponent } from './page-generic-default.component';

describe('PageGenericDefaultComponent', () => {
  let component: PageGenericDefaultComponent;
  let fixture: ComponentFixture<PageGenericDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGenericDefaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageGenericDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
