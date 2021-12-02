import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodComponent } from './add-good.component';

describe('AddGoodComponent', () => {
  let component: AddGoodComponent;
  let fixture: ComponentFixture<AddGoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
