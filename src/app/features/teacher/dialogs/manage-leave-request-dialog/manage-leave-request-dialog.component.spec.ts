import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveRequestDialogComponent } from './manage-leave-request-dialog.component';

describe('ManageLeaveRequestDialogComponent', () => {
  let component: ManageLeaveRequestDialogComponent;
  let fixture: ComponentFixture<ManageLeaveRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLeaveRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaveRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
