import {Component} from '@angular/core';
import {StateService} from 'donatello';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent {
  name = 'Angular';

  constructor() {
    const stateService = new StateService();
    stateService.createPort({
      id: 'assda',
      number: 3333,
      name: 'ddddd',
      active: true,
      routes: [
        {
          id: 'ssdd',
          path: '/',
          method: 'GET',
          active: true,
          responses: [{
            id: 'sss',
            name: 'sdad',
            status: 200,
            delay: 0,
            data: {data: 'vlad'},
            active: true,
          }],
        }
      ]
    })
  }
}