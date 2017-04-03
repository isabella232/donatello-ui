import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import './service-dialog.less';
import {MockService} from '../../../services/mock-service/mock.srv';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {IPort} from 'donatello';
import {UtilService} from '../../../services/util-service/util.srv';

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
    active: true
  };
  isUpdate: boolean = false;

  constructor(private dialogRef: MdDialogRef<ServiceDialog>,
              private mockService: MockService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.serviceForm = this.formBuilder.group({
      id: [this.service.id, Validators.required],
      name: [this.service.name, Validators.required],
      number: [this.service.number, [Validators.required, Validators.pattern('[0-9]*')]],
      active: [this.service.active]
    });
  }

  saveService() {
    const service: IPort = this.serviceForm.getRawValue();
    this.isUpdate ?
    this.mockService.editService(service.id, service) :
    this.mockService.createService(service);
    this.dialogRef.close();
  }
}