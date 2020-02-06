import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceDayComponent } from './ice-day.component';

describe('IceDayComponent', () => {
  let component: IceDayComponent;
  let fixture: ComponentFixture<IceDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
