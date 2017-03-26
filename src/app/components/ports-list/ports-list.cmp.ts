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
    this.ports = [
      {
        id: 'assda',
        number: 3333,
        name: 'port one',
        active: true,
        routes: [
          {
            id: 'ssdd',
            path: '/',
            method: 'GET',
            active: true,
            responses: [{
              id: 'sss',
              name: 'sdad',
              status: 200,
              delay: 0,
              data: {data: 'vlad'},
              active: true,
            }],
          }
        ]
      },
      {
        id: 'p2_sadasd',
        number: 1234,
        name: 'port 2',
        active: true,
        routes: [
          {
            id: 'ssdd',
            path: '/',
            method: 'GET',
            active: true,
            responses: [{
              id: 'sss',
              name: 'sdad',
              status: 200,
              delay: 0,
              data: {data: 'vlad'},
              active: true,
            }],
          }
        ]
      }
    ];
  }

  portClicked(port: IPort) {
    alert(port.id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiceDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}