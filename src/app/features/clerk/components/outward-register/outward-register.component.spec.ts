import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardRegisterComponent } from './outward-register.component';

describe('OutwardRegisterComponent', () => {
  let component: OutwardRegisterComponent;
  let fixture: ComponentFixture<OutwardRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutwardRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
