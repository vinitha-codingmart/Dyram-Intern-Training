import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidBaseComponent } from './mid-base.component';

describe('MidBaseComponent', () => {
  let component: MidBaseComponent;
  let fixture: ComponentFixture<MidBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
