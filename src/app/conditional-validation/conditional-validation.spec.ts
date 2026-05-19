import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalValidation } from './conditional-validation';

describe('ConditionalValidation', () => {
  let component: ConditionalValidation;
  let fixture: ComponentFixture<ConditionalValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalValidation],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionalValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
