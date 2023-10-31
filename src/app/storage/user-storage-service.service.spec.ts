import { TestBed } from '@angular/core/testing';

import { UserStorageServiceService } from './user-storage-service';

describe('UserStorageServiceService', () => {
  let service: UserStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
