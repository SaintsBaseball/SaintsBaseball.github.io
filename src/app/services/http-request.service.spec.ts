import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpRequestService } from './http-request.service';

describe('RequestService', () => {
  let requestService: HttpRequestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      providers: [HttpRequestService],
      imports: [HttpClientTestingModule]
    });
    requestService = TestBed.get(HttpRequestService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(requestService).toBeTruthy();
  });

  describe('get', () => {
    it('should make an http request to get information', () => {
      const dataToReturn = {
        someData: 'fake data'
      };
      const randomUrl = 'https://blahUrl.com/some/random/route';

      requestService.get<Object>(randomUrl).subscribe((data) => {
        expect(data).toBe(dataToReturn);
      });

      const req = httpTestingController.expectOne(randomUrl);
      expect(req.request.method).toBe('GET');
      req.flush(dataToReturn);
    });
  });
});
