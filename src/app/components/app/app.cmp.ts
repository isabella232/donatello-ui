import {Component} from '@angular/core';

@Component({
  selector: 'do-app',
  template: require('./app.html'),
  styles: [require('./app.less').toString()]
})
export class AppComponent {
  constructor() {
  }
}