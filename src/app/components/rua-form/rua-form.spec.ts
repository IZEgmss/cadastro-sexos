import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuaForm } from './rua-form';

describe('RuaForm', () => {
  let component: RuaForm;
  let fixture: ComponentFixture<RuaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
