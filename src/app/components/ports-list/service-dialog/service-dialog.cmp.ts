import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import './service-dialog.less';
import {MockService} from '../../../services/mock-service/mock.srv';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'service-dialog',
  template: require('./service-dialog.html'),
  styles: [require('./service-dialog.less').toString()]
})
export class ServiceDialog implements OnInit {
  registerForm: FormGroup;

  constructor(private dialogRef: MdDialogRef<ServiceDialog>,
              private mockService: MockService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      serviceName: ['',
        Validators.required],
      serviceId: ['', Validators.required],
      port: ['', Validators.required]
    });
  }

  createService() {
    this.mockService.createPort();
  }
}