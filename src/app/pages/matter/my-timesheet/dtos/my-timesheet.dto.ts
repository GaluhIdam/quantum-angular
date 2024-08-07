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
  date: Date;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
  matter: MatterDTO;
  tagEntityList: TagEntityList[];
}
export interface TagEntityList {
  idTag: number;
  uuid: string;
  tagBy: string;
  tagged: string;
  createdAt: Date;
  updatedAt: Date;
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

/** Master Data Dummy */
export interface MatterDTO {
  idMatter: number;
  uuid: string;
  matter: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ActivityDTO {
  idActivity: number;
  uuid: string;
  activity: string;
  createdAt: Date;
  updatedAt: Date;
}
