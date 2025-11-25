import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexoList } from './sexo-list';

describe('SexoList', () => {
  let component: SexoList;
  let fixture: ComponentFixture<SexoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SexoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
