import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import './service-dialog.less';
import {MockService} from '../../../services/mock-service/mock.srv';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPort} from 'donatello-core';
import {UtilService} from '../../../services/util-service/util.srv';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'service-dialog',
  template: require('./service-dialog.html'),
  styles: [require('./service-dialog.less').toString()]
})
export class ServiceDialog implements OnInit {
  serviceForm: FormGroup;
  service: IPort = {
    id: `Service_${UtilService.getRandomInt()}`,
    name: '',
    number: null,
    active: true,
    proxy: {
      url: ''
    }
  };
  isUpdate: boolean = false;

  constructor(private dialogRef: MdDialogRef<ServiceDialog>,
              private mockService: MockService,
              private formBuilder: FormBuilder,
              @Inject(MD_DIALOG_DATA) public dialogData: IServiceDialogData) {
  }

  ngOnInit() {
    this.initView();
    this.serviceForm = this.formBuilder.group({
      id: [this.service.id, Validators.required],
      name: [this.service.name, Validators.required],
      number: [this.service.number, [Validators.required, Validators.pattern('[0-9]*')]],
      proxyUrl: [this.service.proxy.url],
      active: [this.service.active]
    });
  }

  saveService() {
    const rawValue = this.serviceForm.getRawValue();
    if (rawValue.proxyUrl) {
      rawValue.proxy = {
        url: rawValue.proxyUrl
      };

      delete rawValue.proxyUrl;
    }

    this.isUpdate ? this.mockService.editService(rawValue.id, rawValue) :
      this.mockService.createService(rawValue);

    this.dialogRef.close(rawValue);
  }

  private initView() {
    if (this.dialogData) {
      const {service, isUpdate} = this.dialogData;
      this.service = service;
      this.isUpdate = isUpdate;
      if (!service.proxy) {
        service.proxy = {
          url: ''
        };
      }
    }
  }
}

export interface IServiceDialogData {
  service: IPort;
  isUpdate: boolean;
}