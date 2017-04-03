import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IRoute, IResponse} from 'donatello';

@Component({
  selector: 'response-form',
  template: require('./response-form.html'),
  styles: [require('./response-form.less').toString()]
})
export class ResponseForm implements OnInit {
  @Input() config: IResponseInputConfig;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  responseForm: FormGroup;
  isUpdate: boolean = false;
  response: IResponse = {
    id: '',
    name: '',
    status: 200,
    active: true,
    delay: 1000,
    data: {}
  };
  serviceId: string;
  routeId: string;
  prevResponseId: string;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initView();
    this.responseForm = this.formBuilder.group({
      id: [this.response.id, Validators.required],
      name: [this.response.name, Validators.required],
      status: [this.response.status, Validators.required],
      delay: [this.response.delay, Validators.required],
      data: [JSON.stringify(this.response.data)],
      active: [this.response.active]
    });
  }

  private initView() {
    this.serviceId = this.config.serviceId;
    this.routeId = this.config.routeId;
    this.isUpdate = !!this.config.response;
    this.response = {...this.response, ...this.config.response};
    this.prevResponseId = this.response.id;
  }

  saveResponse() {
    const response: IResponse = this.responseForm.getRawValue();
    this.onSave.emit(response);
  }

  cancel() {
    this.onCancel.emit();
  }
}

export interface IResponseInputConfig {
  response: IResponse;
  serviceId: string;
  routeId: string;
}