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
