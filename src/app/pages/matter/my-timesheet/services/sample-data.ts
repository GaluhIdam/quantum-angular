import { Color } from '@quantum/fui';
import { DailyActivityDTO } from '../dtos/my-timesheet.dto';

export class SampleDataMyTimeSheet {
  static readonly progress: {
    percentage: number;
    color: Color;
  }[] = [
    {
      percentage: 70,
      color: 'primary',
    },
    {
      percentage: 20,
      color: 'text',
    },
    {
      percentage: 10,
      color: 'warning',
    },
  ];
  static readonly history_activity: DailyActivityDTO[] = [
    {
      date: new Date('2024-05-20T07:05:59'),
      activityList: [
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Lecture',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5888,
          description: 'Lecture',
          duration: '30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5885,
          description: 'Experiment',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Experiment',
          duration: '1h',
          type: 'mention',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5890,
          description: 'Experiment',
          duration: '30m',
          type: 'mention',
        },
      ],
    },
  ];
}
