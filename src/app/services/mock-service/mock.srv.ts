import {Injectable} from '@angular/core';
import {StateService, IPort, IRoute} from 'donatello';

@Injectable()
export class MockService {
  mockService: StateService;

  constructor() {
    this.mockService = new StateService();
    [
      {
        id: '1',
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
        id: '2',
        number: 1234,
        name: 'port 2',
        active: true,
        routes: [
          {
            id: 'ssdd',
            path: '/',
            method: 'GET',
            active: false,
            responses: [{
              id: 'sss',
              name: 'sdad',
              status: 200,
              delay: 0,
              data: {data: 'keren'},
              active: true,
            }],
          }
        ]
      }
    ].forEach((port) => {
      this.mockService.createPort(<IPort>port);
    });

  }

  getService(id: string): IPort {
    return this.mockService.getPort(id)
  }

  getAllServices(): IPort[] {
    return this.mockService.getPorts();
  }

  createService(port: IPort) {
    return this.mockService.createPort(port);
  }

  editService(portId: string, port: IPort) {
    return this.mockService.updatePort(portId, port);
  }

  createRoute(serviceId: string, route: IRoute): void {
    this.mockService.createRoute(serviceId, route);
  }

  updateRoute(serviceId: string, routeId: string, route: IRoute): void {
    this.mockService.updateRoute(serviceId, routeId, route);
  }
}