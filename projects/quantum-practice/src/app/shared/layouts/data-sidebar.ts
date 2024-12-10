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
  ];
}
