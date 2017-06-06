import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSVToJsonComponent } from './csvto-json.component';

describe('CSVToJsonComponent', () => {
  let component: CSVToJsonComponent;
  let fixture: ComponentFixture<CSVToJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSVToJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
