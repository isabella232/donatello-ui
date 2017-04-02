import {Component, OnInit} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';
import {IPort} from 'donatello';
import {ServiceDialog} from './service-dialog/service-dialog';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'do-ports-list',
  template: require('./ports-list.html')
})
export class PortsListComponent implements OnInit {
  ports: IPort[];
  selectedOption: string;

  constructor(private mockService: MockService, private dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.ports = this.mockService.getAllServices();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiceDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}