import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaList } from './venda-list';

describe('VendaList', () => {
  let component: VendaList;
  let fixture: ComponentFixture<VendaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
