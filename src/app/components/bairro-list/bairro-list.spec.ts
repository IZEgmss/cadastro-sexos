import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BairroList } from './bairro-list';

describe('BairroList', () => {
  let component: BairroList;
  let fixture: ComponentFixture<BairroList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BairroList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BairroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
