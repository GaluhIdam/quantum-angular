import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutsComponent } from './shared/layouts/layouts.component';
import { MyTimesheetComponent } from './pages/matter/my-timesheet/my-timesheet.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutsComponent, RouterModule, MyTimesheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
