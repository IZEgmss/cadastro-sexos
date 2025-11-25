import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeList } from './cidade-list';

describe('CidadeList', () => {
  let component: CidadeList;
  let fixture: ComponentFixture<CidadeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CidadeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
