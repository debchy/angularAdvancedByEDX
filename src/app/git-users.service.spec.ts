import { TestBed, inject } from '@angular/core/testing';

import { GitUsersService } from './git-users.service';

describe('GitUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitUsersService]
    });
  });

  it('should be created', inject([GitUsersService], (service: GitUsersService) => {
    expect(service).toBeTruthy();
  }));
});
