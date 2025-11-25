import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfList } from './uf-list';

describe('UfList', () => {
  let component: UfList;
  let fixture: ComponentFixture<UfList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UfList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UfList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
