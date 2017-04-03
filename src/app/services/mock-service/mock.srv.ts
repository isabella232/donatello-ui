import {Injectable} from '@angular/core';
import {StateService, IPort, IRoute, IState} from 'donatello';
import * as fs from 'fs';

@Injectable()
export class MockService {
  mockService: StateService;

  constructor() {
    this.readStateFromFile();
    // this.mockService = new StateService();
    // [
    //   {
    //     id: '1',
    //     number: 3333,
    //     name: 'port one',
    //     active: true,
    //     routes: [
    //       {
    //         id: 'ssdd',
    //         path: '/',
    //         method: 'GET',
    //         active: true,
    //         responses: [{
    //           id: 'sss',
    //           name: 'sdad',
    //           status: 200,
    //           delay: 0,
    //           data: {data: 'vlad'},
    //           active: true,
    //         }],
    //       }
    //     ]
    //   },
    //   {
    //     id: '2',
    //     number: 1234,
    //     name: 'port 2',
    //     active: true,
    //     routes: [
    //       {
    //         id: 'ssdd',
    //         path: '/',
    //         method: 'GET',
    //         active: false,
    //         responses: [{
    //           id: 'sss',
    //           name: 'sdad',
    //           status: 200,
    //           delay: 0,
    //           data: {data: 'keren'},
    //           active: true,
    //         }]
    //       }
    //     ]
    //   }
    // ].forEach((port) => {
    //   this.writeStateToFile(this.mockService.createPort(<IPort>port));
    // });

  }

  createRoute(serviceId: string, route: IRoute): void {
    this.writeStateToFile(this.mockService.createRoute(serviceId, route));
  }

  updateRoute(serviceId: string, routeId: string, route: IRoute): void {
    this.writeStateToFile(this.mockService.updateRoute(serviceId, routeId, route));
  }

  getService(id: string): IPort {
    return this.mockService.getPort(id);
  }

  getAllServices(): IPort[] {
    return this.mockService.getPorts();
  }

  createService(port: IPort) {
    this.writeStateToFile(this.mockService.createPort(port));
  }

  editService(portId: string, port: IPort) {
    this.writeStateToFile(this.mockService.updatePort(portId, port));
  }

  private readStateFromFile() {
    fs.readFile('state.json', {encoding: 'utf8'}, (err, data) => {
      if (err) {
        return;
      }

      this.mockService.createState(JSON.parse(data.toString()));
    });
  }

  private writeStateToFile(state: IState) {
    fs.writeFile('state.json', JSON.stringify(state), (err: NodeJS.ErrnoException, fd: number) => {
      if (err) {
        console.error('error!');
        return;
      }
      console.log(fd);
    });
  }
}