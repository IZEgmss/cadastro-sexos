import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexoForm } from './sexo-form';

describe('SexoForm', () => {
  let component: SexoForm;
  let fixture: ComponentFixture<SexoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SexoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
