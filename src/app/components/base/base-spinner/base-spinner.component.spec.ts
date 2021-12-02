import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSpinnerComponent } from './base-spinner.component';

describe('BaseSpinnerComponent', () => {
  let component: BaseSpinnerComponent;
  let fixture: ComponentFixture<BaseSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
