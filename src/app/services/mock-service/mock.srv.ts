import {Injectable} from '@angular/core';
import {StateService, IPort, IRoute, IState} from 'donatello';
import * as fs from 'fs';

@Injectable()
export class MockService {
  mockService: StateService = new StateService();

  init() {
    this.readStateFromFile();
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
    const data = fs.readFileSync('state.json', {encoding: 'utf8'});
    this.mockService.createState(JSON.parse(data.toString()));
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