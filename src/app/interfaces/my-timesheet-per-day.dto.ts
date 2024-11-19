import { MyTimesheetDTO } from './my-timesheet.dto';

export interface MyTimesheetPerDay {
  date: string;
  data: MyTimesheetDTO[];
  show: boolean;
  selectAll: boolean;
}
