import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInwardEntryDialogComponent } from './add-inward-entry-dialog.component';

describe('AddInwardEntryDialogComponent', () => {
  let component: AddInwardEntryDialogComponent;
  let fixture: ComponentFixture<AddInwardEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInwardEntryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInwardEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
