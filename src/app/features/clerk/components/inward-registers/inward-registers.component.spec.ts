import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRegistersComponent } from './inward-registers.component';

describe('InwardRegistersComponent', () => {
  let component: InwardRegistersComponent;
  let fixture: ComponentFixture<InwardRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InwardRegistersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
