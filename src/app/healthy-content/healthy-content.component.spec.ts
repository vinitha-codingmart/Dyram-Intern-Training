import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyContentComponent } from './healthy-content.component';

describe('HealthyContentComponent', () => {
  let component: HealthyContentComponent;
  let fixture: ComponentFixture<HealthyContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
