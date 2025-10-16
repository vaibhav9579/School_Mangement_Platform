import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOutwordEntryDialogComponent } from './delete-outword-entry-dialog.component';

describe('DeleteOutwordEntryDialogComponent', () => {
  let component: DeleteOutwordEntryDialogComponent;
  let fixture: ComponentFixture<DeleteOutwordEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteOutwordEntryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOutwordEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
