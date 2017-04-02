import {Component, OnInit} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';
import {ActivatedRoute} from '@angular/router';
import {IPort} from 'donatello';

@Component({
  selector: 'do-service-view',
  template: require('./service-view.html'),
  styles: [require('./service-view.less').toString()]
})
export class ServiceView implements OnInit {
  id: string;
  service: IPort;

  constructor(private mockService: MockService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.init();
  }

  init() {
    this.service = this.mockService.getService(this.id);
  }
}

@Component({
  selector: 'do-service-view-empty',
  template: `<div>No Service Selected</div>`
})
export class ServiceEmptyView {

}