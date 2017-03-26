import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ServiceView} from './components/service-view/service-view.cmp';

export const routes: Routes = [
  {path: 'services/:id', component: ServiceView}
];