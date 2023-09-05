import { TestBed } from '@angular/core/testing';

import { WorkInformationService } from './work-information.service';

describe('WorkInformationService', () => {
  let service: WorkInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
