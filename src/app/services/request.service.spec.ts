import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RequestService } from './request.service';

describe('RequestService', () => {
  let requestService: RequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule],
      providers: [RequestService]
    });
    requestService = TestBed.get(RequestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(requestService).toBeTruthy();
  });

  describe('get', () => {
    it('should make an http request to get information', () => {
      const randomUrl = 'https://blahUrl.com/some/random/route';

      requestService.get(randomUrl);

      const req = httpMock.expectOne(randomUrl);
      expect(req.request.method).toBe('GET');
    });
  });
});
