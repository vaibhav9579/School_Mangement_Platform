import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesStatusComponent } from './fees-status.component';

describe('FeesStatusComponent', () => {
  let component: FeesStatusComponent;
  let fixture: ComponentFixture<FeesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
