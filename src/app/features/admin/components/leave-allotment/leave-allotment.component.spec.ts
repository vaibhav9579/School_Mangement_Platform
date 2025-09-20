import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAllotmentComponent } from './leave-allotment.component';

describe('LeaveAllotmentComponent', () => {
  let component: LeaveAllotmentComponent;
  let fixture: ComponentFixture<LeaveAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveAllotmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
