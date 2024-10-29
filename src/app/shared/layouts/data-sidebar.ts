import { DataSideDTO, Size } from '@quantum/fui';

export class DataSideBar {
  static readonly size: Size | undefined = 'sizem';
  static readonly dataSideBar: DataSideDTO[] = [
    {
      size: this.size,
      icon: 'home',
      link: '/home',
      title: 'Home',
      active: false,
    },
    {
      size: this.size,
      icon: 'folderClosed',
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
      icon: 'folderClosed',
      title: 'Billing',
      active: false,
      children: [
        {
          title: 'Stackholder',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'OPE',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'OPE Rates',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Matters OPE',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Lawyers Rate',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Currency',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Units',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Template Description Hours',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Travel Rates',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Billing Bank Account',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
        {
          title: 'Billing',
          active: false,
          link: '#',
          size: this.size,
          icon: 'submodule',
        },
      ],
    },
    {
      size: this.size,
      icon: 'document',
      title: 'Administration',
      active: false,
      children: [
        {
          title: 'Location',
          active: false,
          link: '/master-data/location',
          size: this.size,
        },
        {
          title: 'Matter Type',
          active: false,
          link: '/master-data/matter-type',
          size: this.size,
        },
        {
          title: 'Document 3',
          active: false,
          link: '',
          size: this.size,
        },
      ],
    },
    {
      size: this.size,
      icon: 'users',
      title: 'Example',
      active: false,
      children: [
        {
          title: 'User 1',
          active: false,
          link: '',
          size: this.size,
        },
        {
          title: 'User 2',
          active: false,
          link: '',
          size: this.size,
        },
      ],
    },
    {
      size: this.size,
      icon: 'email',
      title: 'Example',
      active: false,
      children: [
        {
          title: 'Email 1',
          active: false,
          link: '',
          size: this.size,
        },
        {
          title: 'Email 2',
          active: false,
          link: '',
          size: this.size,
        },
        {
          title: 'Email 3',
          active: false,
          link: '',
          size: this.size,
        },
        {
          title: 'Email 4',
          active: false,
          link: '',
          size: this.size,
        },
      ],
    },
  ];
}
