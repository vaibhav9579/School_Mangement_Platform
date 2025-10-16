import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutwordEntryDialogComponent } from './add-outword-entry-dialog.component';

describe('AddOutwordEntryDialogComponent', () => {
  let component: AddOutwordEntryDialogComponent;
  let fixture: ComponentFixture<AddOutwordEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOutwordEntryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutwordEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
