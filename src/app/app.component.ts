import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './shared/layouts/layouts.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutsComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
