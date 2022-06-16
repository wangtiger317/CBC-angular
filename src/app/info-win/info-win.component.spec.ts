import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWinComponent } from './info-win.component';

describe('InfoWinComponent', () => {
  let component: InfoWinComponent;
  let fixture: ComponentFixture<InfoWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
