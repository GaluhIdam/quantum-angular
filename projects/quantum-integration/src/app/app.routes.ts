import { mapToCanActivate, Routes } from '@angular/router';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  /** Home Modules */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'matter/my-timesheet',
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
    ],
  },
];
