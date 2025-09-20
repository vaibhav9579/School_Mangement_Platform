import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassDialogComponent } from './manage-class-dialog.component';

describe('ManageClassDialogComponent', () => {
  let component: ManageClassDialogComponent;
  let fixture: ComponentFixture<ManageClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClassDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
