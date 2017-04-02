import {Routes} from '@angular/router';
import {ServiceView, ServiceEmptyView} from './components/service-view/service-view.cmp';

export const routes: Routes = [
  {path: '', component: ServiceEmptyView},
  {path: 'services/:id', component: ServiceView}
];