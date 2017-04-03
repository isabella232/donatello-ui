import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {MockService} from '../../../services/mock-service/mock.srv';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IRoute, IResponse} from 'donatello';
import {IResponseInputConfig} from './response-form/response-form.cmp';

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
    id: '',
    method: 'GET',
    path: '/',
    active: true,
    responses: []
  };
  serviceId: string;
  prevRouteId: string;
  responseConfig: IResponseInputConfig;
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

  private initView() {
    const {route, serviceId} = this.dialogRef.config.data;
    this.serviceId = serviceId;
    this.isUpdate = !!route;
    this.route = <IRoute>{...this.route, ...route};
    this.prevRouteId = this.route.id;

    this.responseConfig = {
      serviceId: serviceId,
      routeId: this.route.id,
      response: null
    }
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

  saveRoute() {
    const route: IRoute = {...this.route, ...this.routeForm.getRawValue()};
    this.isUpdate ?
      this.mockService.updateRoute(this.serviceId, this.prevRouteId, route) :
      this.mockService.createRoute(this.serviceId, route);

    this.dialogRef.close();
  }
}