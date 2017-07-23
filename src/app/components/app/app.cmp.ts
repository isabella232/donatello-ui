import {Component} from '@angular/core';
import {MenuService} from '../../services/menu-service/menu.srv';

@Component({
  selector: 'do-app',
  template: require('./app.html'),
  styles: [require('./app.less').toString()]
})
export class AppComponent {
  constructor(menuService: MenuService) {
  }
}
