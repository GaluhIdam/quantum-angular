import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoutUploadMatterComponent } from './flyout-upload-matter.component';

describe('FlyoutUploadMatterComponent', () => {
  let component: FlyoutUploadMatterComponent;
  let fixture: ComponentFixture<FlyoutUploadMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoutUploadMatterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoutUploadMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
