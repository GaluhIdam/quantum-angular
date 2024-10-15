import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AvatarComponent,
  ButtonIconComponent,
  DataSideDTO,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  LoadingComponent,
  PopoverComponent,
  SidenavComponent,
  ThemeService,
} from '@quantum/fui';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'shared-mini-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonIconComponent,
    AvatarComponent,
    IconsComponent,
    PopoverComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    RouterModule,
    SidenavComponent,
    LoadingComponent,
  ],
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.scss'],
})
export class MiniSidebarComponent implements OnInit, OnDestroy {
  @Input() dataSidebar: DataSideDTO[] = [
    {
      size: 'sizem',
      icon: 'folderClosed',
      title: 'Billing',
      link: '/billing',
      active: false,
    },
  ];

  menuSeleted: DataSideDTO | null = null;
  menuSeleted2: DataSideDTO | null = null;
  searchForm: FormControl = new FormControl('');

  themeService = inject(ThemeService);
  theme!: string;
  loading: boolean = false;

  private renderer = inject(Renderer2);
  private unlistener!: () => void;

  obs!: Subscription;

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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

    // Listen for clicks outside the menu to close it
    this.unlistener = this.renderer.listen(
      'document',
      'click',
      this.onClickOutside.bind(this)
    );
  }

  ngOnDestroy(): void {
    // Clean up the event listener
    if (this.obs) {
      this.obs.unsubscribe();
    }
    if (this.unlistener) {
      this.unlistener();
    }
  }

  /** Toggle select menu or navigate directly */
  selectMenu(item: DataSideDTO): void {
    this.menuSeleted2 = item;
    this.dataSidebar.forEach((x) => {
      x.active = false;
    });
    item.active = true;
    this.menuSeleted = item;

    if (item.children && item.children.length > 0) {
    } else {
      this.moveToPage(item.link!);
    }
  }


  clearMenu(): void {
    this.menuSeleted = null;
    this.searchForm.setValue('');
  }

  /** Handle clicking outside the menu */
  private onClickOutside(event: Event): void {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clearMenu();
    }
  }

  /** Navigate to the given page */
  moveToPage(page: string) {
    this.router.navigate([page]);
  }
}
