import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './components/app/app.cmp';
import {MockService} from './services/mock-service/mock.srv';
import {PortsListComponent} from './components/ports-list/ports-list.cmp';
import {ServiceView} from './components/service-view/service-view.cmp';
import {ServiceDialog} from './components/ports-list/service-dialog/service-dialog';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    PortsListComponent,
    ServiceDialog,
    ServiceView
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