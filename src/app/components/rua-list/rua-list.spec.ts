import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuaList } from './rua-list';

describe('RuaList', () => {
  let component: RuaList;
  let fixture: ComponentFixture<RuaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
