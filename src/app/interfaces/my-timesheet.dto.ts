export interface MyTimesheetDTO {
  idTimesheet: number;
  uuid: string;
  activity: ActivityTimesheetDTO;
  objectEvent: string;
  topic: string;
  description: string;
  date: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  matter: MatterTimesheetDTO;
  tagEntityList: TagEntityListTimesheetDTO[];
}
export interface ActivityTimesheetDTO {
  idActivity: number;
  uuid: string;
  activity: string;
  createdAt: string;
  updatedAt: string;
}
export interface MatterTimesheetDTO {
  idMatter: number;
  uuid: string;
  matter: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface TagEntityListTimesheetDTO {
  idTag: number;
  uuid: string;
  tagBy: string;
  tagged: string;
  createdAt: string;
  updatedAt: string;
}

/** Grouping By Date */
export interface TimesheetByDateDTO {
  date: string;
  data: MyTimesheetDTO[];
}
