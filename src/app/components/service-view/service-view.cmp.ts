import {Component, OnInit} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';
import {ActivatedRoute} from '@angular/router';
import {IPort, IRoute} from 'donatello';
import {MdSelectChange, MdSlideToggleChange, MdDialog} from '@angular/material';
import {RouteDialog} from './route-dialog/route-dialog.cmp';

@Component({
  selector: 'do-service-view',
  template: require('./service-view.html'),
  styles: [require('./service-view.less').toString()]
})
export class ServiceView implements OnInit {
  service: IPort;

  constructor(private mockService: MockService, private route: ActivatedRoute, private routeDialog: MdDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.init(params['id']);
    });
  }

  init(serviceId: string) {
    this.service = this.mockService.getService(serviceId);
  }

  responseChanged(route: IRoute, event: MdSelectChange) {
    console.log(event);
  }

  routeToggle(route: IRoute, event: MdSlideToggleChange) {
    // this.mockService.updateRoute();
  }

  openRouteDialog(route: IRoute = null) {
    const dialogRef = this.routeDialog.open(RouteDialog, {
      data: {
        route,
        serviceId: this.service.id
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.init(this.service.id);
    });
  }
}

@Component({
  selector: 'do-service-view-empty',
  template: `<div>No Service Selected</div>`
})
export class ServiceEmptyView {

}