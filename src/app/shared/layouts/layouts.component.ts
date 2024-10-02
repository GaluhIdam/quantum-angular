import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet, Routes } from '@angular/router';
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
  SitewideSearchComponent,
  SitewideDTO,
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
import { keycloak } from '../../environment/env';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { UserKeycloak } from '../../core/guard/keycloak/keycloak.dto';
import {
  ActivityDTO,
  MatterDTO,
} from '../../pages/matter/my-timesheet/dtos/my-timesheet.dto';
import { MyTimesheetService } from '../../pages/matter/my-timesheet/services/my-timesheet.service';
import { FlyoutTimesheetComponent } from '../flyout-timesheet/flyout-timesheet.component';
import { MiniSidebarComponent } from '../mini-sidebar/mini-sidebar.component';
import { routes } from '../../app.routes';

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
    AvatarComponent,
    ModalDeleteComponent,
    FlyoutTimesheetComponent,
    MiniSidebarComponent,
    SitewideSearchComponent,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  router: Routes = routes;
  searchForm: FormControl = new FormControl();
  loading: boolean = false;
  themeService = inject(ThemeService);
  notifyCount: number = 6;
  emailCount: number = 12;
  showSidebar: boolean = true;
  dataSide: DataSideDTO[] = [];
  theme!: string;

  mattersData: MatterDTO[] = [];
  activitesData: ActivityDTO[] = [];

  searchForms: FormControl = new FormControl();
  data: SitewideDTO[] = [];
  filteredData: SitewideDTO[] = [];
  searchTog: boolean = false;

  private destroy$ = new Subject<void>();
  private obs!: Subscription;

  tab: number = 1;
  isOpenFlyout: boolean = false;

  logoutModal: boolean = false;

  /** Data user from keycloak */
  nameUser: string = '';

  constructor(
    private navigate: Router,
    private cdr: ChangeDetectorRef,
    private readonly authService: OidcAuthenticatorService,
    private readonly myTimesheetService: MyTimesheetService
  ) {
    this.dataSide = DataSideBar.dataSideBar;
    // this.getUser();
  }

  ngOnInit(): void {
    this.getMatterData('');
    this.getActivityData();
    this.themeService.currentTheme$.subscribe((data) => {
      if (data === 'light') {
        this.theme = 'ahp-light';
        this.themeService.setTheme('ahp-light');
      }
      if (data === 'dark') {
        this.theme = 'ahp-dark';
        this.themeService.setTheme('ahp-dark');
      }
    });
    this.obs = this.searchForm.valueChanges
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(500),
        map((value) => {
          this.filterDataSide(value);
          this.loading = false;
          this.filterData();
        })
      )
      .subscribe();
    this.obs = this.searchForms.valueChanges
      .pipe(debounceTime(400))
      .subscribe((data) => {
        this.filterData();
      });
    this.restructureData();
    this.navigate.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.navigate.url;
          this.updateActiveStatus(currentRoute);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.cdr.detectChanges();
    this.restructureData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }

  /** Get matters from service */
  getMatterData(search: string): void {
    this.myTimesheetService
      .getMatters(search)
      .pipe(map((data) => (this.mattersData = data)))
      .subscribe();
  }

  /** Get activity from service */
  getActivityData(): void {
    this.myTimesheetService
      .getActivites()
      .pipe(
        map((data) => {
          this.activitesData = data;
        })
      )
      .subscribe();
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
      if (res) {
        this.nameUser = res.name;
      } else {
        this.nameUser = 'Username';
      }
    });
  }

  filterData(): void {
    const searchTerm = this.searchForms.value.toLowerCase();
    this.filteredData = this.data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
  }

  goTo(event: any): void {
    this.navigate.navigate([
      event.anything.parent + '/' + event.anything.child,
    ]);
    this.searchTog = false;
  }

  searchToggle(): void {
    this.searchTog = !this.searchTog;
  }

  protected _sortRoutesAlphabetically(routes: any[]): void {
    routes.forEach((route) => {
      if (route.children) {
        route.children.sort((a: { title?: string }, b: { title?: string }) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          } else if (a.title) {
            return 1;
          } else if (b.title) {
            return -1;
          } else {
            return 0;
          }
        });
        this._sortRoutesAlphabetically(route.children);
      }
    });
  }

  restructureData(): void {
    this.router.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.title) {
            const dto: SitewideDTO = {
              title: child.title.toString(),
              icon: 'arrowRight',
              description: 'Navigate to the ' + child.title.toString(),
              anything: {
                parent: item.path,
                child: child.path,
              },
            };
            this.data.push(dto);
          }
        });
      }
    });
    this.filteredData = [...this.data];
  }
}
