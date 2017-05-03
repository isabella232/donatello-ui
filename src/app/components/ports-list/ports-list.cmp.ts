import {Component, OnInit} from '@angular/core';
import {MockService} from '../../services/mock-service/mock.srv';
import {IPort} from 'donatello-core';
import {ServiceDialog} from './service-dialog/service-dialog.cmp';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'do-ports-list',
  template: require('./ports-list.html'),
  styles: [require('./ports-list.less').toString()]
})
export class PortsListComponent implements OnInit {
  services: IPort[];
  selectedOption: string;

  constructor(private mockService: MockService,
              private router: Router,
              private dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.services = this.mockService.getAllServices();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ServiceDialog);

    dialogRef.afterClosed().subscribe((service: IPort) => {
      if (service) {
        this.ngOnInit();
        this.router.navigate(['/services', service.id]);
      }
    });
  }
}


