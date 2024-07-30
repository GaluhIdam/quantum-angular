import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  ButtonIconComponent,
  DataSideDTO,
  HeaderComponent,
  HeaderPanelComponent,
  IconsComponent,
  PageBodyComponent,
  PageComponent,
  PageSidebarComponent,
  SidenavComponent,
  ThemeService,
  FormControlLayoutComponent,
  InputFieldComponent,
  LoadingComponent,
  PopoverComponent,
  TextComponent,
  AvatarComponent,
  OidcAuthenticatorService,
} from '@quantum/fui';
import {
  debounceTime,
  filter,
  map,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { DataSideBar } from './data-sidebar';
import { CreateTimesheetFlyoutComponent } from '../create-timesheet-flyout/create-timesheet-flyout.component';
import { keycloak } from '../../environment/env';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { UserKeycloak } from '../../core/guard/keycloak/keycloak.dto';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PageComponent,
    PageBodyComponent,
    ButtonIconComponent,
    HeaderComponent,
    HeaderPanelComponent,
    PageSidebarComponent,
    IconsComponent,
    SidenavComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    LoadingComponent,
    PopoverComponent,
    TextComponent,
    CreateTimesheetFlyoutComponent,
    AvatarComponent,
    ModalDeleteComponent,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  searchForm: FormControl = new FormControl();
  loading: boolean = false;
  themeService = inject(ThemeService);
  notifyCount: number = 6;
  emailCount: number = 12;
  showSidebar: boolean = true;
  dataSide: DataSideDTO[] = [];
  theme!: string;

  private destroy$ = new Subject<void>();
  private obs!: Subscription;

  tab: number = 1;
  isOpenFlyout: boolean = false;

  logoutModal: boolean = false;

  /** Data user from keycloak */
  nameUser: string = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private readonly authService: OidcAuthenticatorService
  ) {
    this.dataSide = DataSideBar.dataSideBar;
    this.getUser();
  }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((data) => {
      this.theme = data;
    });
    this.obs = this.searchForm.valueChanges
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(500),
        map((value) => {
          this.filterDataSide(value);
          this.loading = false;
        })
      )
      .subscribe();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.router.url;
          this.updateActiveStatus(currentRoute);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }

  /** Hide Sidebar if Mobile Device */
  showEvent(event: any): void {
    this.showSidebar = event;
  }

  /** Toggle For Sidebar */
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  /** Toggle Mode Dark/Light */
  toggleMode(theme: string): void {
    this.themeService.setTheme(theme);
  }

  /** Check Route */
  updateActiveStatus(currentRoute: string): void {
    this.dataSide.forEach((item) => {
      item.active = item.link === currentRoute;
      if (item.children) {
        item.children.forEach((child) => {
          child.active = child.link === currentRoute;
        });
        item.active = item.children.some((child) => child.active);
      }
    });
  }

  /** Filter for sidebar by title */
  filterDataSide(searchTerm: string) {
    if (!searchTerm) {
      this.dataSide = DataSideBar.dataSideBar;
    } else {
      this.dataSide = this.filterItems(
        DataSideBar.dataSideBar,
        searchTerm.toLowerCase()
      );
    }
    this.cdr.markForCheck();
  }

  /** Helper Filter for sidebar by title */
  filterItems(items: DataSideDTO[], searchTerm: string): DataSideDTO[] {
    return items
      .map((item) => {
        const matchingChildren = item.children
          ? this.filterItems(item.children, searchTerm)
          : [];
        const isMatch = item.title.toLowerCase().includes(searchTerm);

        // Set the item as active if it matches or has matching children
        const active = isMatch || matchingChildren.length > 0;

        return {
          ...item,
          active,
          children: matchingChildren,
        };
      })
      .filter((item) => item.active || item.children.length > 0);
  }

  /** Move Tab */
  clickTab(param: number): void {
    this.tab = param;
  }

  /** Toggle for open flyout */
  toggleOpenFlyout(): void {
    this.isOpenFlyout = true;
  }

  /** Observe changes from flyout */
  closeOut(event: boolean): void {
    this.isOpenFlyout = event;
  }

  /** Open modal for confirm logout */
  logout(): void {
    this.logoutModal = !this.logoutModal;
  }

  /** Logout and direct to login keycloak */
  logoutAction(): void {
    this.authService.logoutAuth(keycloak).subscribe();
  }

  /** Getting data user from keycloak */
  getUser(): void {
    this.authService.getUserInfo(keycloak).subscribe((res) => {
      this.nameUser = res.name;
    });
  }
}
