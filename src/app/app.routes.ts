import { Routes } from '@angular/router';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';
import { MyMatterComponent } from './pages/matter/my-matter/my-matter.component';
import { AllMatterComponent } from './pages/matter/all-matter/all-matter.component';

export const routes: Routes = [
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
      },
      {
        title: 'My Matter',
        path: 'my-matter',
        component: MyMatterComponent,
      },
      {
        title: 'All Matter',
        path: 'all-matter',
        component: AllMatterComponent,
      },
    ],
  },
];
