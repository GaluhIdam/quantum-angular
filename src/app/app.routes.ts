import { mapToCanActivate, Routes } from '@angular/router';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';
import { MyMatterComponent } from './pages/matter/my-matter/my-matter.component';
import { AllMatterComponent } from './pages/matter/all-matter/all-matter.component';
import { DetailMatterComponent } from './pages/matter/my-matter/detail-matter/detail-matter.component';
import { AuthGuard } from './core/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
  },

  /** Forbidden Page */
  {
    title: 'Access Forbidden',
    path: 'forbidden',
    component: ForbiddenComponent,
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
      },
      {
        title: 'Detail Matter',
        path: 'detail-matter',
        component: DetailMatterComponent,
      },
      {
        title: 'All Matter',
        path: 'all-matter',
        component: AllMatterComponent,
      },
    ],
  },

  /** Wildcard route for a 404 page */
  {
    title: 'Page Not Found',
    path: '**',
    component: NotFoundComponent,
  },
];
