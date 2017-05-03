import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IResponse} from 'donatello-core';
import {UtilService} from '../../../../services/util-service/util.srv';

@Component({
  selector: 'response-form',
  template: require('./response-form.html'),
  styles: [require('./response-form.less').toString()]
})
export class ResponseForm implements OnInit {
  @Input() config: IResponseInputConfig;
  @Output() onSave = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  responseForm: FormGroup;
  isUpdate: boolean = false;
  response: IResponse = {
    id: `Response_${UtilService.getRandomInt()}`,
    name: '',
    status: 200,
    active: false,
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

  saveResponse() {
    const response: IResponse = this.responseForm.getRawValue();
    this.onSave.emit(response);
  }

  deleteResponse() {
    this.onDelete.emit(this.config.response);
  }

  cancel() {
    this.onCancel.emit();
  }

  private initView() {
    this.serviceId = this.config.serviceId;
    this.routeId = this.config.routeId;
    this.isUpdate = !!this.config.response;
    this.response = {...this.response, ...this.config.response};
    this.prevResponseId = this.response.id;
  }
}

export interface IResponseInputConfig {
  response: IResponse;
  serviceId: string;
  routeId: string;
}