import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutMatterMembersComponent } from './flyout-matter-members.component';

describe('FlyoutMatterMembersComponent', () => {
  let component: FlyoutMatterMembersComponent;
  let fixture: ComponentFixture<FlyoutMatterMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutMatterMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutMatterMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
