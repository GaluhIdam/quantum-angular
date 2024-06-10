import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
} from '@quantum/fui';
import { filter, Subject, takeUntil } from 'rxjs';

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
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  themeService = inject(ThemeService);
  notifyCount: number = 6;
  emailCount: number = 12;
  showSidebar: boolean = true;
  dataSide: DataSideDTO[] = [
    {
      icon: {
        type: 'home',
        size: 'sizem',
      },
      link: '/home',
      title: 'Home',
      active: false,
    },
    {
      icon: {
        type: 'folderClosed',
        size: 'sizem',
      },
      title: 'Matter',
      active: false,
      children: [
        {
          title: 'My Timesheet',
          active: false,
          link: '/matter/my-timesheet',
        },
        {
          title: 'My Matter',
          active: false,
          link: '/matter/my-matter',
        },
        {
          title: 'All Matter',
          active: false,
          link: '/matter/all-matter',
        },
      ],
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        let currentRoute = this.router.url;
        this.updateActiveStatus(currentRoute);
      });
    this.cdr.detectChanges();
    setTimeout(() => {
      this.handleNormalToast('warning');
    }, 5000);
  }

  ngAfterViewInit(): void {}

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
}
