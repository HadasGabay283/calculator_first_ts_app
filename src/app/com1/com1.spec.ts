import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Com1 } from './com1';

describe('Com1', () => {
  let component: Com1;
  let fixture: ComponentFixture<Com1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Com1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Com1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
