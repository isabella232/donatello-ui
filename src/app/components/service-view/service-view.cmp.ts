import {Component, OnInit} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';
import {ActivatedRoute} from '@angular/router';
import {IPort, IRoute, IResponse} from 'donatello';
import {MdSelectChange, MdSlideToggleChange, MdDialog} from '@angular/material';
import {RouteDialog} from './route-dialog/route-dialog.cmp';

@Component({
  selector: 'do-service-view',
  template: require('./service-view.html'),
  styles: [require('./service-view.less').toString()]
})
export class ServiceView implements OnInit {
  service: IPort;
  selectedResponses = {};

  constructor(private mockService: MockService,
              private route: ActivatedRoute,
              private routeDialog: MdDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.init(params['id']);
    });
  }

  init(serviceId: string) {
    this.service = this.mockService.getService(serviceId);
    this.setSelectedResponses();
  }

  responseChanged(route: IRoute, {value}: {value: string}) {
    this.mockService.activateResponse(this.service.id, route.id, value);
    this.init(this.service.id);
  }

  routeToggle(route: IRoute, {checked}: {checked: boolean}) {
    checked ? this.mockService.activateRoute(this.service.id, route.id) :
      this.mockService.deactivateRoute(this.service.id, route.id);
    this.init(this.service.id);
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

  private setSelectedResponses() {
    if (this.service.routes) {
      this.selectedResponses = this.service.routes.reduce((map, route) => {
        map[route.id] = this.getSelectedResponse(route);
        return map;
      }, {})
    } else {
      this.selectedResponses = {};
    }
  }

  private getSelectedResponse(route: IRoute): string {
    let selectedResponse: IResponse;

    if (route.responses) {
      selectedResponse = route.responses.find((resp) => resp.active);
    }

    return selectedResponse ? selectedResponse.id : null;
  }
}

@Component({
  selector: 'do-service-view-empty',
  template: `<div>No Service Selected</div>`
})
export class ServiceEmptyView {

}