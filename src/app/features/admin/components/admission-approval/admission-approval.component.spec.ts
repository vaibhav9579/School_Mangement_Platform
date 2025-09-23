import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionApprovalComponent } from './admission-approval.component';

describe('AdmissionApprovalComponent', () => {
  let component: AdmissionApprovalComponent;
  let fixture: ComponentFixture<AdmissionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
