import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authguardsGuard } from './authguards.guard';

describe('authguardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authguardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
