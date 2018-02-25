import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolladdComponent } from './polladd.component';

describe('PolladdComponent', () => {
  let component: PolladdComponent;
  let fixture: ComponentFixture<PolladdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolladdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
