import {Component} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';
require('./app.less');

@Component({
  selector: 'do-app',
  template: require('./app.html'),
  styleUrls: ['app.css']
})
export class AppComponent {
  name = 'Angular';

  constructor(private mockService: MockService) {
  }
}