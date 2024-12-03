import { DataSideDTO, Size } from '@quantum/fui';

export class DataSideBar {
  static readonly size: Size | undefined = 'sizem';
  static readonly dataSideBar: DataSideDTO[] = [
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
          title: 'Position',
          active: false,
          link: '/master-data/position',
          size: this.size,
        },
        {
          title: 'Company Entity',
          active: false,
          link: '/master-data/company-entity',
          size: this.size,
        },
        {
          title: 'Office Location',
          active: false,
          link: '/master-data/office-location',
          size: this.size,
        },
        {
          title: 'Practice Area',
          active: false,
          link: '/master-data/practice-area',
          size: this.size,
        },
        {
          title: 'Industry Type',
          active: false,
          link: '/master-data/industry-type',
          size: this.size,
        },
      ],
    },
  ];
}
