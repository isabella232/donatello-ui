import {Routes} from '@angular/router';
import {ServiceView} from './components/service-view/service-view.cmp';

export const routes: Routes = [
  {path: '', component: ServiceView},
  {path: 'services/:id', component: ServiceView}
];