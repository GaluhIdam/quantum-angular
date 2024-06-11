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
  ToastComponent,
  ToastService,
  ToastProps,
  Color,
  FormControlLayoutComponent,
  InputFieldComponent,
  LoadingComponent,
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
    ToastComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    LoadingComponent,
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

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.dataSide = DataSideBar.dataSideBar;
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
    setTimeout(() => {
      this.handleNormalToast('warning');
    }, 5000);
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

  /** Call Toaster */
  handleNormalToast(type?: Color) {
    let toastObject: ToastProps = {
      position: 'bottom-right',
      header: {
        title: 'Information',
        icon: 'iInCircle',
        colorIcon: 'warning',
        sizeIcon: 'sizel',
      },
      body: {
        message: 'This website is under construction!',
      },
      duration: 5000,
    };
    if (type) {
      toastObject.type = type;
    }
    this.toastService.toast(toastObject);
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
}
