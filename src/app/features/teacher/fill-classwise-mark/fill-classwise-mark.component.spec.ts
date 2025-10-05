import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillClasswiseMarkComponent } from './fill-classwise-mark.component';

describe('FillClasswiseMarkComponent', () => {
  let component: FillClasswiseMarkComponent;
  let fixture: ComponentFixture<FillClasswiseMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillClasswiseMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillClasswiseMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
