import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillMarkDialogComponent } from './fill-mark-dialog.component';

describe('FillMarkDialogComponent', () => {
  let component: FillMarkDialogComponent;
  let fixture: ComponentFixture<FillMarkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillMarkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillMarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
