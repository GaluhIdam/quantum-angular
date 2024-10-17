/** Daily Activity List */
export interface DailyActivityDTO {
  date: Date;
  activityList: HourActivityDTO[];
}

/** Hour Activity List */
export interface HourActivityDTO {
  date: Date;
  matter: string | number;
  description: string;
  type: 'mention' | 'self';
  duration: string;
}

/** MyTimesheet DTO */
export interface MyTimesheetDTO {
  idTimesheet: number;
  uuid: string;
  activity: ActivityDTO;
  objectEvent: string;
  topic: string;
  description: string;
  date: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  matter: MatterDTO;
  tagEntityList: TagEntityList[];
}
export interface ActivityDTO {
  idActivity: number;
  uuid: string;
  activity: string;
  createdAt: string;
  updatedAt: string;
}
export interface MatterDTO {
  idMatter: number;
  uuid: string;
  matter: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface TagEntityList {
  idTag: number;
  uuid: string;
  tagBy: string;
  tagged: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyTimesheetPostDTO {
  description: string;
  date: string;
  duration: string;
  matterId: number;
  activityId: number;
  officialCategoryId: number;
}

/** Grouping By Date */
export interface TimesheetByDateDTO {
  date: string;
  data: MyTimesheetDTO[];
}


