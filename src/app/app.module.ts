import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './components/app/app.cmp';
import {MockService} from './services/mock-service/mock.srv';
import {PortsListComponent} from './components/ports-list/ports-list.cmp';
import {ServiceView, ServiceEmptyView} from './components/service-view/service-view.cmp';
import {ServiceDialog} from './components/ports-list/service-dialog/service-dialog.cmp';
import {RouterModule} from '@angular/router';
import {routes} from './app.router';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouteDialog} from './components/service-view/route-dialog/route-dialog.cmp';
import './styles/theme.scss';

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
    ServiceView,
    ServiceEmptyView,
    RouteDialog
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ServiceDialog,
    RouteDialog
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