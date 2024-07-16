import { Routes } from '@angular/router';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';
import { MyMatterComponent } from './pages/matter/my-matter/my-matter.component';
import { AllMatterComponent } from './pages/matter/all-matter/all-matter.component';
import { DetailMatterComponent } from './pages/matter/my-matter/detail-matter/detail-matter.component';

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
    component: MyTimesheetComponent,
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
];
