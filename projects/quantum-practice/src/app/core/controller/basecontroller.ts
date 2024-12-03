import { inject } from '@angular/core';
import { Color, Icon, Size, ToastProps, ToastService } from '@quantum/fui';
import { Observable, of } from 'rxjs';
import { MyTimesheetDTO } from '../../interfaces/my-timesheet.dto';

export class BaseController {
  /** Injector */
  toastService = inject(ToastService);

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

  /** Toggle Toast */
  toggleToast(
    type: Color,
    title: string,
    icon: Icon,
    message: string,
    sizeIcon: Size
  ): void {
    let toastObject: ToastProps = {
      position: 'bottom-right',
      header: {
        title,
        icon: icon,
        colorIcon: type,
        sizeIcon: sizeIcon,
        colorTitle: type,
      },
      body: {
        message,
      },
      duration: 2000,
    };
    if (type) {
      toastObject.type = type;
    }
    this.toastService.toast(toastObject);
  }

  /** Calculate Total Duration, return e.x 3h 30m */
  calculateTotalDuration(timesheets: MyTimesheetDTO[]): string {
    let totalMinutes = 0;
    timesheets.forEach((timesheet) => {
      const durationParts = timesheet.duration.split(':');
      const hours = parseInt(durationParts[0], 10);
      const minutes = parseInt(durationParts[1], 10);
      totalMinutes += hours * 60 + minutes;
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  /** Helper Date */
  addDays(dateString: string, days: number): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return this.formatDate(date);
  }

  /** Date Formatter */
  defaultDate(): {
    startDateForm: string;
    endDateForm: string;
  } {
    const currentDate: Date = new Date();
    currentDate.setDate(new Date().getDate() - 5);
    const year: number = currentDate.getFullYear();
    const month: string = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const day: string = currentDate.getDate().toString().padStart(2, '0');

    const currentDateC: Date = new Date();
    const yearC: number = currentDateC.getFullYear();
    const monthC: string = (currentDateC.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const dayC: string = currentDateC.getDate().toString().padStart(2, '0');
    return {
      startDateForm: `${year}-${month}-${day}`,
      endDateForm: `${yearC}-${monthC}-${dayC}`,
    };
  }

  /** Count total duration by tag or non tag */
  calculateTotalDurationTag(timesheets: MyTimesheetDTO[]): {
    taggedDuration: string;
    untaggedDuration: string;
  } {
    let taggedTotalMinutes = 0;
    let untaggedTotalMinutes = 0;

    timesheets.forEach((timesheet) => {
      const [hours, minutes] = timesheet.duration.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;

      if (timesheet.pending) {
        taggedTotalMinutes += totalMinutes;
      } else {
        untaggedTotalMinutes += totalMinutes;
      }
    });

    return {
      taggedDuration: this.convertMinutesToHoursMinutes(taggedTotalMinutes),
      untaggedDuration: this.convertMinutesToHoursMinutes(untaggedTotalMinutes),
    };
  }

  // Helper function to convert minutes to "XXh XXm" format
  private convertMinutesToHoursMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  calculateTotalDurationTagPercent(timesheets: MyTimesheetDTO[]): {
    taggedPercentage: number;
    untaggedPercentage: number;
    remainingPercentage: number;
  } {
    const totalMinutesInDay = 1440; // 24 hours in minutes
    let taggedTotalMinutes = 0;
    let untaggedTotalMinutes = 0;

    timesheets.forEach((timesheet) => {
      const [hours, minutes] = timesheet.duration.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;

      if (timesheet.pending) {
        taggedTotalMinutes += totalMinutes;
      } else {
        untaggedTotalMinutes += totalMinutes;
      }
    });

    const taggedPercentage = (taggedTotalMinutes / totalMinutesInDay) * 100;
    const untaggedPercentage = (untaggedTotalMinutes / totalMinutesInDay) * 100;
    const remainingPercentage = 100 - taggedPercentage - untaggedPercentage; // Calculate remaining percentage

    return {
      taggedPercentage,
      untaggedPercentage,
      remainingPercentage,
    };
  }

  /** Array converter to string
   * @example
   * [
      {
        "name": "12345",
        "value": 10001
      },
      {
        "name": "54321",
        "value": 10002
      }
   *]
    @description
    to be "12345, 54321"
   */
  getNamesAsString(arr: { name: string; value: number }[]): string {
    return arr.map((item) => item.name).join(',');
  }

  /** Centralized error handling method */
  errorHandlerService(error: any, res: 'object' | 'array'): Observable<any> {
    console.log('Error occurred:', error);
    if (res === 'array') {
      return of([]);
    } else {
      return of({});
    }
  }
}
