import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillMarkComponent } from './fill-mark.component';

describe('FillMarkComponent', () => {
  let component: FillMarkComponent;
  let fixture: ComponentFixture<FillMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
