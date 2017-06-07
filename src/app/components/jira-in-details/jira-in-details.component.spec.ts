import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraInDetailsComponent } from './jira-in-details.component';

describe('JiraInDetailsComponent', () => {
  let component: JiraInDetailsComponent;
  let fixture: ComponentFixture<JiraInDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiraInDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraInDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
