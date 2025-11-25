import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepForm } from './cep-form';

describe('CepForm', () => {
  let component: CepForm;
  let fixture: ComponentFixture<CepForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CepForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
