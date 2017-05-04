import {Component, OnInit} from '@angular/core';
import {MdDialogRef, MdSelectChange} from '@angular/material';
import {MockService} from '../../../services/mock-service/mock.srv';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IRoute, IResponse} from 'donatello-core';
import {IResponseInputConfig} from './response-form/response-form.cmp';
import {UtilService} from '../../../services/util-service/util.srv';

@Component({
  selector: 'route-dialog',
  template: require('./route-dialog.html'),
  styles: [require('./route-dialog.less').toString()]
})
export class RouteDialog implements OnInit {
  routeForm: FormGroup;
  methods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
  isUpdate: boolean = false;
  route: IRoute = {
    id: `Route_${UtilService.getRandomInt()}`,
    method: 'GET',
    path: '/',
    active: true,
    responses: []
  };
  serviceId: string;
  prevRouteId: string;
  responseConfig: IResponseInputConfig;
  responseToEditConfig: IResponseInputConfig;
  showAddResponse: boolean = false;
  showEditResponse: boolean = false;

  constructor(private dialogRef: MdDialogRef<RouteDialog>,
              private mockService: MockService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initView();
    this.routeForm = this.formBuilder.group({
      id: [this.route.id, Validators.required],
      path: [this.route.path, Validators.required],
      method: [this.route.method, Validators.required],
      active: [this.route.active]

    });
  }

  addResponse() {
    this.showAddResponse = true;
  }

  onResponseCancel() {
    this.showAddResponse = false;
  }

  onResponseSave(response: IResponse) {
    this.route.responses = this.route.responses ? this.route.responses.concat(response) : [].concat(response);
    this.showAddResponse = false;
  }

  onResponseEditChange({value}: {value: IResponse}) {
    this.responseToEditConfig = {
      response: {...value},
      serviceId: this.serviceId,
      routeId: this.route.id
    };
  }

  onResponseEditSave(response: IResponse) {
    const prevIndex = this.route.responses.findIndex((resp) => resp.id === this.responseToEditConfig.response.id);
    this.route.responses[prevIndex] = response;
    this.responseToEditConfig = null;
  }

  onResponseDeleteSave(response: IResponse) {
    const prevIndex = this.route.responses.findIndex((resp) => resp.id === response.id);
    this.route.responses.splice(prevIndex, 1);
  }

  onResponseEditCancel() {
    this.responseToEditConfig = null;
  }

  saveRoute() {
    const route: IRoute = {...this.route, ...this.routeForm.getRawValue()};
    this.isUpdate ?
      this.mockService.updateRoute(this.serviceId, this.prevRouteId, route) :
      this.mockService.createRoute(this.serviceId, route);

    this.dialogRef.close();
  }

  private initView() {
    const {route, serviceId} = this.dialogRef.componentInstance;
    this.serviceId = serviceId;
    this.isUpdate = !!route;
    this.route = <IRoute>{...this.route, ...route};
    this.prevRouteId = this.route.id;

    this.responseConfig = {
      serviceId: serviceId,
      routeId: this.route.id,
      response: null
    };
  }
}