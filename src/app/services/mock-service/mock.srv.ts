import {Injectable} from '@angular/core';
import {StateService} from 'donatello';

@Injectable()
export class MockService {
  mockService: StateService;

  constructor() {
    this.mockService = new StateService();
  }

  addPort (){

  }
}