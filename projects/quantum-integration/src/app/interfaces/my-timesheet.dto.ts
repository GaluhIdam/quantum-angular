import { ActivityDTO } from './activity.dto';
import { MatterDTO } from './matter.dto';

export interface MyTimesheetDTO {
  uuid: string;
  matter: MatterDTO;
  activity: ActivityDTO;
  description: string;
  date: string;
  duration: string;
  pending: boolean;
  tagBy: string;
  created_at: string;
  updated_at: string;
}
