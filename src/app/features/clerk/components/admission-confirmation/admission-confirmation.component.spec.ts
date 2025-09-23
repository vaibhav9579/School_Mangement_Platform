import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionConfirmationComponent } from './admission-confirmation.component';

describe('AdmissionConfirmationComponent', () => {
  let component: AdmissionConfirmationComponent;
  let fixture: ComponentFixture<AdmissionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
