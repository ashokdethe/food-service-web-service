import { TestBed } from '@angular/core/testing';

import { FoodTruckServiceService } from './food-truck-service.service';

describe('FoodTruckServiceService', () => {
  let service: FoodTruckServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodTruckServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
