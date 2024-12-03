import { Routes } from '@angular/router';
import { LocationComponent } from './pages/master-data/location/location.component';
import { MatterTypesComponent } from './pages/master-data/matter-types/matter-types.component';
import { PositionComponent } from './pages/master-data/position/position.component';
import { CompanyEntityComponent } from './pages/master-data/company-entity/company-entity.component';
import { OfficeLocationComponent } from './pages/master-data/office-location/office-location.component';
import { PracticeAreaComponent } from './pages/master-data/practice-area/practice-area.component';
import { IndustryTypeComponent } from './pages/master-data/industry-type/industry-type.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'administrator',
  },
  {
    path: 'administrator',
    children: [
      {
        title: 'Location',
        path: 'location',
        component: LocationComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Matter Type',
        path: 'matter-type',
        component: MatterTypesComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Position',
        path: 'position',
        component: PositionComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Company Entity',
        path: 'company-entity',
        component: CompanyEntityComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Office Location',
        path: 'office-location',
        component: OfficeLocationComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Practice Area',
        path: 'practice-area',
        component: PracticeAreaComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Industry Type',
        path: 'industry-type',
        component: IndustryTypeComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
    ],
  },
];
