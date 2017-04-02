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

  constructor(private dialogRef: MdDialogRef<ServiceDialog>, private mockService: MockService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      servicename: ['', Validators.required],
      serviceid: ['', Validators.required],
      port: ''
    });
  }
  addService() {
    this.mockService.addPort();
  }
}