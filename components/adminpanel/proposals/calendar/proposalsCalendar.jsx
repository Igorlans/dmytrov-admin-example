import React, { useMemo, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import uk from "date-fns/locale/uk";
import { DatePicker, RangePicker, theme } from 'react-trip-date';
import dayjs from 'dayjs';

const ProposalsCalendar = ({proposals, selectedDate, setSelectedDate}) => {
    // console.log(proposals);

    // const events = useMemo(() => {

    // }, [proposals])
    const handleSelect = (date) => {
      setSelectedDate(date);
    };
    const handleChange = (date) => {
        setSelectedDate(date);
      };
      
  
    const events = useMemo(() => {
        return proposals?.map(proposal => {
            return dayjs(Number(proposal.date)).format('DD-MM-YYYY')
        })
    }, [proposals])
  
    const Day = ({ day }) => {
      const handleClick = () => handleSelect(day);
      const isHighlighted = events?.find(item => item === dayjs(day).format('DD-MM-YYYY'))
        // console.log(day)
      return (
        <div className='relative' onClick={handleClick}>
          <p>{dayjs(day).format('DD')}</p>
          {isHighlighted && <div className=" block h-3 w-3 rounded-full bg-orange-400 absolute top-[-5px] right-[-5px]"></div>}
        </div>
      );
    };
  

    const handleResponsive = (setNumberOfMonth) => {
      let width = document.querySelector('.tp-calendar').clientWidth;
      if (width > 900) {
        setNumberOfMonth(3);
      } else if (width < 900 && width > 580) {
        setNumberOfMonth(2);
      } else if (width < 580) {
        setNumberOfMonth(1);
      }
    };
  
      const theme = {
        primary: {
          light: "#757ce8",
          main: "#3f50b5",
          dark: "#002884",
        },
        grey: {
          700: "#707070",
          900: "#1b1b1d",
        },
        background: {
          default: "#f5f5f5",
        },
        text: {
          disabled: "#BABABA",
        },
      };

    return (
      <div>
        <DatePicker
            theme={theme}
            onChange={handleChange}
            value={selectedDate}
            locale={uk}
            numberOfMonths={4}
            numberOfSelectableDays={1}
            components={{
                days: Day,
            }}
            // disabledDays={['2019-12-02']}
            responsive={handleResponsive}
            // disabledBeforeToday={true}
            // disabled={false}
            // dayComponent={Day}
            // onSelect={handleSelect}
            // colors={{
            //   selectedDayBackgroundColor: '#e55733',
            //   selectedDayTextColor: '#ffffff',
            //   hoverBackgroundColor: '#e55733',
            //   hoverTextColor: '#ffffff',
            //   textColor: '#000000',
            //   borderColor: '#e55733',
            //   dividerColor: '#e55733',
            //   backgroundColor: '#ffffff',
            //   headerBackgroundColor: '#e55733',
            //   headerTextColor: '#ffffff'
            // }}
        />

      </div>
    );
  };
  
  export default ProposalsCalendar;
  