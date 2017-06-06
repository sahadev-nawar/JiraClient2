import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCreateJiraComponent } from './bulk-create-jira.component';

describe('BulkCreateJiraComponent', () => {
  let component: BulkCreateJiraComponent;
  let fixture: ComponentFixture<BulkCreateJiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkCreateJiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkCreateJiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
