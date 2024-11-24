"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type CalendarComponentProps = {
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  closedDates?: { closedDate: string }[];
  onClickDay?: (dateValue: Date) => void;
  locale?: string;
  tileDisabled?: (params: {
    activeStartDate?: Date;
    date?: Date;
    view?: string;
  }) => boolean;
};

const CalendarComponent = ({
  value,
  minDate,
  maxDate,
  closedDates,
  onClickDay,
  tileDisabled,
  locale,
}: CalendarComponentProps) => {
  return (
    <Calendar
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      className={"class1"}
      locale={locale}
      onClickDay={onClickDay}
      tileDisabled={tileDisabled}
    />
  );
};

export default CalendarComponent;
