import { DataSideDTO, Size } from '@quantum/fui';

export class DataSideBar {
  static readonly size: Size | undefined = 'sizem';
  static readonly dataSideBar: DataSideDTO[] = [
    {
      size: this.size,
      icon: {
        type: 'home',
      },
      link: '/home',
      title: 'Home',
      active: false,
    },
    {
      size: this.size,
      icon: {
        type: 'folderClosed',
      },
      title: 'Matter',
      active: false,
      children: [
        {
          title: 'My Timesheet',
          active: false,
          link: '/matter/my-timesheet',
          size: this.size,
        },
        {
          title: 'My Matter',
          active: false,
          link: '/matter/my-matter',
          size: this.size,
        },
        {
          title: 'All Matter',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
        },
      ],
    },
    {
      size: this.size,
      icon: {
        type: 'folderClosed',
      },
      title: 'Billing',
      active: false,
      children: [
        {
          title: 'Stackholder',
          active: false,
          link: '/matter/my-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'OPE',
          active: false,
          link: '/matter/my-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'OPE Rates',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Matters OPE',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Lawyers Rate',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Currency',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Units',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Template Description Hours',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Travel Rates',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Billing Bank Account',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
        {
          title: 'Billing',
          active: false,
          link: '/matter/all-matter',
          size: this.size,
          icon: {
            type: 'submodule',
          },
        },
      ],
    },
  ];
}
