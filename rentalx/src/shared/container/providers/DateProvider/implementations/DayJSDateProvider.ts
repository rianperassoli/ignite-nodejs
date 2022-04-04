import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJSDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const utc_start_date = this.convertToUTC(start_date);
    const utc_end_date = this.convertToUTC(end_date);

    return dayjs(utc_start_date).diff(utc_end_date, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayJSDateProvider };