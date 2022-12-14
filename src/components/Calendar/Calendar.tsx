import styled from 'styled-components';
import FullCalendar, { DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarContainer = styled.div`
  position: relative;
  width: auto;
  .fc-toolbar-title {
    display: inline;
    font-size: 16px;
    font-weight: 400;
    margin: 0 15px;
  }
  #title-calendar {
    position: absolute;
    top: 5px;
    font-size: 16px;
    font-weight: 400;
  }
  .fc .fc-button-primary {
    color: #799283;
    background: none;
    border: none;
    &:active,
    &:focus,
    &:focus-visible {
      color: #799283;
      background: none;
      border: none;
      box-shadow: none;
    }
    &:active:focus {
      box-shadow: none;
    }
  }
  .fc .fc-col-header-cell-cushion {
    color: #799283;
    font-weight: 400;
  }
  .fc .fc-daygrid-day.fc-day-today,
  .fc-highlight {
    background: none;
  }
  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
    padding: 0 6px;
    cursor: pointer;
  }
  .fc .fc-daygrid-day-frame {
    height: 59px;
  }
  .fc .fc-daygrid-day-top {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fc .fc-daygrid-day-number {
    padding-top: 18px;
  }
  .fc .fc-scroller-liquid-absolute,
  .fc-scroller {
    overflow: hidden !important;
  }
  .fc .fc-bg-event {
    opacity: 1;
    border-radius: 12px;
  }

  /* .fc-daygrid-day-frame:has(.fc-daygrid-day-bg):has(.fc-daygrid-bg-harness:last-child) {
    color: white;
  } */
`;

// const todayStr = new Date().toISOString().replace(/T.*$/, '');

const DUMMY_BOOKINGS = [
  {
    checkIn: '2022-12-03',
    checkOut: '2022-12-08',
  },
  {
    checkIn: '2022-12-08',
    checkOut: '2022-12-14',
  },
  {
    checkIn: '2022-12-13',
    checkOut: '2022-12-18',
  },
];

interface IDUMMY_BOOKINGS {
  checkIn: string;
  checkOut: string;
}

export const Calendar: React.FC = () => {
  const handleEventClick: (arg: DateSelectArg) => void = (clickInfo) => {
    console.log('clickInfo', clickInfo);
  };

  const datesCalendarGroupHandler = (data: IDUMMY_BOOKINGS[]) => {
    const sameDayCheckInCheckOut: string[] = [];
    const onlyCheckIn: string[] = [];
    const onlyCheckOut: string[] = [];

    const checkInDates = data.map((obj) => obj.checkIn);
    const checkOutDates = data.map((obj) => obj.checkOut);

    checkInDates.forEach((date) => {
      checkOutDates.includes(date)
        ? sameDayCheckInCheckOut.push(date)
        : onlyCheckIn.push(date);
    });

    checkOutDates.forEach((date) => {
      !sameDayCheckInCheckOut.includes(date) && onlyCheckOut.push(date);
    });

    return { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut };
  };

  const renderEventesHandler = (data: IDUMMY_BOOKINGS[]) => {
    const { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut } =
      datesCalendarGroupHandler(data);

    const eventsWhenCheckInCheckOut = sameDayCheckInCheckOut.map((date) => ({
      start: date,
      end: date,
      overlap: true,
      display: 'background',
      backgroundColor: '#FF9C3A',
    }));
    const eventsOnlyCheckIn = onlyCheckIn.map((date) => ({
      start: date,
      end: date,
      overlap: true,
      display: 'background',
      backgroundColor: '#135846',
    }));
    const eventsOnlyCheckOut = onlyCheckOut.map((date) => ({
      start: date,
      end: date,
      overlap: true,
      display: 'background',
      backgroundColor: '#E23428',
    }));
    return [
      ...eventsWhenCheckInCheckOut,
      ...eventsOnlyCheckIn,
      ...eventsOnlyCheckOut,
    ];
  };

  return (
    <CalendarContainer>
      <h3 id='title-calendar'>Recent Booking Schedule</h3>
      <FullCalendar
        initialView='dayGridMonth'
        firstDay={0}
        locale='en'
        headerToolbar={{
          left: '',
          center: '',
          right: 'prev,title,next',
        }}
        events={renderEventesHandler(DUMMY_BOOKINGS)}
        select={handleEventClick}
        editable={true}
        selectable={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        height={450}
      />
    </CalendarContainer>
  );
};
