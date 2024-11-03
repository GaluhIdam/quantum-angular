import { mapToCanActivate, Routes } from '@angular/router';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';
import { MyMatterComponent } from './pages/matter/my-matter/my-matter.component';
import { AllMatterComponent } from './pages/matter/all-matter/all-matter.component';
import { AuthGuard } from './core/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailMatterComponent } from './pages/matter/detail-matter/detail-matter.component';
import { MatterFormComponent } from './pages/matter/matter-form/matter-form.component';
import { LocationComponent } from './pages/master-data/location/location.component';
import { MatterTypesComponent } from './pages/master-data/matter-types/matter-types.component';
import { PositionComponent } from './pages/master-data/position/position.component';
import { CompanyEntityComponent } from './pages/master-data/company-entity/company-entity.component';
import { OfficeLocationComponent } from './pages/master-data/office-location/office-location.component';
import { PracticeAreaComponent } from './pages/master-data/practice-area/practice-area.component';
import { IndustryTypeComponent } from './pages/master-data/industry-type/industry-type.component';

export const routes: Routes = [
  /** Home Modules */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
    // canActivate: mapToCanActivate([AuthGuard]),
  },

  /** Forbidden Page */
  {
    title: 'Access Forbidden',
    path: 'forbidden',
    component: ForbiddenComponent,
    // canActivate: mapToCanActivate([AuthGuard]),
  },

  /** Matter Modules */
  {
    path: 'matter',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-timesheet',
      },
      {
        title: 'My Timesheet',
        path: 'my-timesheet',
        component: MyTimesheetComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'My Matter',
        path: 'my-matter',
        component: MyMatterComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Detail Matter',
        path: 'detail-matter',
        component: DetailMatterComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'All Matter',
        path: 'all-matter',
        component: AllMatterComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Matter Form',
        path: 'matter-form',
        component: MatterFormComponent,
        // canActivate: mapToCanActivate([AuthGuard]),
      },
    ],
  },

  {
    path: 'master-data',
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

  /** Wildcard route for a 404 page */
  {
    title: 'Page Not Found',
    path: '**',
    component: NotFoundComponent,
    // canActivate: mapToCanActivate([AuthGuard]),
  },
];
