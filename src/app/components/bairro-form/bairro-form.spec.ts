import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairroForm } from './bairro-form';

describe('BairroForm', () => {
  let component: BairroForm;
  let fixture: ComponentFixture<BairroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BairroForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BairroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
