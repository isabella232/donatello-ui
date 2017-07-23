import {Injectable} from '@angular/core';
import {StateService, IPort, IRoute, IState} from 'donatello-core';
import * as fs from 'fs';
import {remote} from 'electron';
import * as path from 'path';

@Injectable()
export class MockService {
  mockService: StateService;
  private readonly stateDir = path.normalize(`${remote.app.getPath('userData')}/state.json`);

  init() {
    this.mockService = new StateService();
    this.readStateFromFile();
  }

  createRoute(serviceId: string, route: IRoute): void {
    this.mockService.createRoute(serviceId, route);
    this.writeStateToFile();
  }

  updateRoute(serviceId: string, routeId: string, route: IRoute): void {
    this.mockService.updateRoute(serviceId, routeId, route);
    this.writeStateToFile();
  }

  getService(id: string): IPort {
    return this.mockService.getPort(id);
  }

  getAllServices(): IPort[] {
    return this.mockService.getPorts();
  }

  createService(port: IPort) {
    this.mockService.createPort(port);
    this.writeStateToFile();
  }

  editService(portId: string, port: IPort) {
    this.mockService.updatePort(portId, port);
    this.writeStateToFile();
  }

  deleteService(portId: string) {
    this.mockService.removePort(portId);
    this.writeStateToFile();
  }

  activateState(serviceId: string, routeId: string) {
    this.writeStateToFile();
  }

  activateRoute(serviceId: string, routeId: string) {
    this.mockService.activateRoute(serviceId, routeId);
    this.writeStateToFile();
  }

  deactivateRoute(serviceId: string, routeId: string) {
    this.mockService.deactivateRoute(serviceId, routeId);
    this.writeStateToFile();
  }

  activateResponse(serviceId: string, routeId: string, responseId: string) {
    this.mockService.activateResponse(serviceId, routeId, responseId);
    this.writeStateToFile();
  }

  getState(): IState {
    return this.mockService.getState();
  }

  private readStateFromFile() {
    try {
      const data = fs.readFileSync(this.stateDir, {encoding: 'utf8'});
      this.mockService.createState(JSON.parse(data.toString()));
    } catch (e) {
      console.log('no states.json file');
    }
  }

  private writeStateToFile(state: IState = this.getState()) {
    fs.writeFile(this.stateDir, JSON.stringify(state), (err: NodeJS.ErrnoException) => {
      if (err) {
        console.error('error!');
      }
    });
  }
}