import {Component} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';

@Component({
  selector: 'do-ports-list',
  template: require('./ports-list.html')
})
export class PortsListComponent {

  constructor(private mockService: MockService) {
  }
}