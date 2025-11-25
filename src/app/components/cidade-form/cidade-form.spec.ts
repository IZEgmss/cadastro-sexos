import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeForm } from './cidade-form';

describe('CidadeForm', () => {
  let component: CidadeForm;
  let fixture: ComponentFixture<CidadeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CidadeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
