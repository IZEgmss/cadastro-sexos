import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfForm } from './uf-form';

describe('UfForm', () => {
  let component: UfForm;
  let fixture: ComponentFixture<UfForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UfForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UfForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
