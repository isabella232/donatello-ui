import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.cmp';
import {MockService} from './services/mock-service/mock.srv';
import {PortsListComponent} from './components/ports-list/ports-list.cmp';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    PortsListComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [MockService]
})
export class AppModule {
  constructor() {

  }
}