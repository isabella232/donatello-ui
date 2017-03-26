import {Component} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';

@Component({
  selector: 'do-service-view',
  template: require('./service-view.html'),
  styles: [require('./service-view.less').toString()]
})
export class ServiceView {
  name = 'Angular';

  constructor(private mockService: MockService) {
  }
}