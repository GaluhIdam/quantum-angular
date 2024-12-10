import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './shared/layouts/layouts.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '@quantum/fui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptor/logging-interceptor';
import { ErrorInterceptor } from './core/interceptor/error-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutsComponent, RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppComponent {}
