import { TestBed, inject } from '@angular/core/testing';

import { UploadCSVService } from './upload-csv.service';

describe('UploadCSVService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadCSVService]
    });
  });

  it('should ...', inject([UploadCSVService], (service: UploadCSVService) => {
    expect(service).toBeTruthy();
  }));
});
