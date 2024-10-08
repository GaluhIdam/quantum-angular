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
import { MasterDataComponent } from './pages/master-data/master-data.component';

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
    canActivate: mapToCanActivate([AuthGuard]),
  },

  /** Forbidden Page */
  {
    title: 'Access Forbidden',
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: mapToCanActivate([AuthGuard]),
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
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'My Matter',
        path: 'my-matter',
        component: MyMatterComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Detail Matter',
        path: 'detail-matter',
        component: DetailMatterComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'All Matter',
        path: 'all-matter',
        component: AllMatterComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        title: 'Matter Form',
        path: 'matter-form',
        component: MatterFormComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
    ],
  },

  {
    title: 'Master Data',
    path: 'master-data',
    component: MasterDataComponent,
  },

  /** Wildcard route for a 404 page */
  {
    title: 'Page Not Found',
    path: '**',
    component: NotFoundComponent,
    canActivate: mapToCanActivate([AuthGuard]),
  },
];
