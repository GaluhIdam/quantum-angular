import { Routes } from '@angular/router';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';
import { MyMatterComponent } from './pages/matter/my-matter/my-matter.component';
import { DetailMatterComponent } from './pages/matter/detail-matter/detail-matter.component';
import { AllMatterComponent } from './pages/matter/all-matter/all-matter.component';
import { MatterFormComponent } from './pages/matter/matter-form/matter-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'matter',
  },
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
];
