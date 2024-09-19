import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './shared/layouts/layouts.component';
import { RouterModule } from '@angular/router';
import { DataSideDTO, OidcAuthenticatorService } from '@quantum/fui';
import { keycloak } from './environment/env';
import { DataSideBar } from './shared/layouts/data-sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutsComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dataSide: DataSideDTO[] = [];
  constructor(private readonly _authService: OidcAuthenticatorService) {
    this.dataSide = DataSideBar.dataSideBar;
    /** Callback Handle */
    this._authService.callBackAuth(keycloak);
  }
}
