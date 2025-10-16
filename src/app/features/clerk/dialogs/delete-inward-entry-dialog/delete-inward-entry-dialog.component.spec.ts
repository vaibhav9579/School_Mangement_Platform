import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInwardEntryDialogComponent } from './delete-inward-entry-dialog.component';

describe('DeleteInwardEntryDialogComponent', () => {
  let component: DeleteInwardEntryDialogComponent;
  let fixture: ComponentFixture<DeleteInwardEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteInwardEntryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteInwardEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
