export class BaseController {
  /** Convert e.x 02:30 to be 2h 30m */
  convertTimeToAngularFormat(timeString: string): string {
    var parts = timeString.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    var angularFormat = hours + 'h ' + minutes + 'm';
    return angularFormat;
  }

  /** Get Date With Range
   * @param range
   */
  getDateWithRange(startDate: Date, range: number): { endDate: Date } {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + range);
    return { endDate: newEndDate };
  }

  /** Date Matcher Helper */
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /** Date Converter */
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
