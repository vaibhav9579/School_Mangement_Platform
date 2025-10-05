import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkMemoComponent } from './mark-memo.component';

describe('MarkMemoComponent', () => {
  let component: MarkMemoComponent;
  let fixture: ComponentFixture<MarkMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkMemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
