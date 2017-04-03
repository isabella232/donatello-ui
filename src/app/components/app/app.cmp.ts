import {Component} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';

@Component({
  selector: 'do-app',
  template: require('./app.html'),
  styles: [require('./app.less').toString()]
})
export class AppComponent {
  name = 'Angular';

  constructor() {
  }
}