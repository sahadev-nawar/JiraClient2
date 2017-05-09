import { TestBed, inject } from '@angular/core/testing';

import { CreateJiraService } from './create-jira.service';

describe('CreateJiraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateJiraService]
    });
  });

  it('should ...', inject([CreateJiraService], (service: CreateJiraService) => {
    expect(service).toBeTruthy();
  }));
});
