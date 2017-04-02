import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './components/app/app.cmp';
import {MockService} from './services/mock-service/mock.srv';
import {PortsListComponent} from './components/ports-list/ports-list.cmp';
import {ServiceView} from './components/service-view/service-view.cmp';
import {ServiceDialog} from './components/ports-list/service-dialog/service-dialog';
import {RouterModule} from '@angular/router';
import {routes} from './app.router';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import './styles/theme.scss';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
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
    {provide: APP_BASE_HREF, useValue: ''},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    MockService
  ]
})
export class AppModule {
  constructor() {

  }
}