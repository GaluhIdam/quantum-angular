import { HourActivityDTO } from '../../pages/matter/my-timesheet/dtos/my-timesheet.dto';

export class BaseController {
  /** Hour Amount Func
   * @param data
   * @param type
   */
  getTotalDurationByType(data: HourActivityDTO[], type: string): string {
    const durations = data
      .filter((activity) => activity.type === type)
      .map((activity) => this.parseDuration(activity.duration));

    const totalMinutes = durations.reduce(
      (total, duration) => total + duration,
      0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  /** Helper Hour Amount Func */
  private parseDuration(durationString: string): number {
    const parts = durationString.split(' ');
    let totalMinutes = 0;
    parts.forEach((part) => {
      const value = parseInt(part);
      if (part.includes('h')) {
        totalMinutes += value * 60;
      } else if (part.includes('m')) {
        totalMinutes += value;
      }
    });
    return totalMinutes;
  }

  /** Get Date With Range
   * @param range
   */
  getDateWithRange(startDate: Date, range: number): { endDate: Date } {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + range);
    return { endDate: newEndDate };
  }
}
