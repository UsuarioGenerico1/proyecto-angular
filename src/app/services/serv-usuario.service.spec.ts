import { TestBed } from '@angular/core/testing';

import { ServUsuarioService } from './serv-usuario.service';

describe('ServUsuarioService', () => {
  let service: ServUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
