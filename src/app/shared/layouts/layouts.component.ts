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

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.themeService.setTheme('light');
    this.themeService.applyTheme();
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
}
