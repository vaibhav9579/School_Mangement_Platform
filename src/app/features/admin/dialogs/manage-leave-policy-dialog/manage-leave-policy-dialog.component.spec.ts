import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeavePolicyDialogComponent } from './manage-leave-policy-dialog.component';

describe('ManageLeavePolicyDialogComponent', () => {
  let component: ManageLeavePolicyDialogComponent;
  let fixture: ComponentFixture<ManageLeavePolicyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLeavePolicyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeavePolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
