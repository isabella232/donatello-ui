import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './components/app/app.cmp';
import {MockService} from './services/mock-service/mock.srv';
import {PortsListComponent} from './components/ports-list/ports-list.cmp';
import './styles/theme.scss';
import {ServiceDialog} from './components/ports-list/service-dialog/service-dialog';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    PortsListComponent,
    ServiceDialog
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ServiceDialog
  ],
  providers: [
    MockService
  ]
})
export class AppModule {
  constructor() {

  }
}