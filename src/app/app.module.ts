import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './components/app/app.cmp';
import {MockService} from './services/mock-service/mock.srv';
import {PortsListComponent} from './components/ports-list/ports-list.cmp';
import {ServiceView} from './components/service-view/service-view.cmp';
import {RouterModule} from '@angular/router';
import {routes} from './app.router';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    PortsListComponent,
    ServiceView
  ],
  bootstrap: [
    AppComponent
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