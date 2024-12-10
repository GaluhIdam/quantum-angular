import { DataSideDTO, Size } from '@quantum/fui';

export class DataSideBar {
  static readonly size: Size | undefined = 'sizem';
  static readonly dataSideBar: DataSideDTO[] = [
    {
      size: this.size,
      icon: 'document',
      title: 'Administration',
      active: false,
      children: [
        {
          title: 'Location',
          active: false,
          link: '/administrator/location',
          size: this.size,
        },
        {
          title: 'Matter Type',
          active: false,
          link: '/administrator/matter-type',
          size: this.size,
        },
        {
          title: 'Position',
          active: false,
          link: '/administrator/position',
          size: this.size,
        },
        {
          title: 'Company Entity',
          active: false,
          link: '/administrator/company-entity',
          size: this.size,
        },
        {
          title: 'Office Location',
          active: false,
          link: '/administrator/office-location',
          size: this.size,
        },
        {
          title: 'Practice Area',
          active: false,
          link: '/administrator/practice-area',
          size: this.size,
        },
        {
          title: 'Industry Type',
          active: false,
          link: '/administrator/industry-type',
          size: this.size,
        },
      ],
    },
  ];
}
