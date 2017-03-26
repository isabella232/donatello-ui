import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import './service-dialog.less';
import {MockService} from '../../../services/mock-service/mock.srv';

@Component({
  selector: 'service-dialog',
  template: require('./service-dialog.html'),
  styles: [require('./service-dialog.less').toString()]
})
export class ServiceDialog {
  constructor(private dialogRef: MdDialogRef<ServiceDialog>, private mockService: MockService) {
  }

  addService() {
    this.mockService.addPort();
  }
}