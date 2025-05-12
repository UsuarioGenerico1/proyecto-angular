import { TestBed } from '@angular/core/testing';

import { ServForoService } from './serv-foro.service';

describe('ServForoService', () => {
  let service: ServForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
