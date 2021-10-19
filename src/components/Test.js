import React, { useEffect, useState } from 'react';
const Test = () => {
    const [datesevenmanas, setDatesevenmanas] = useState([]);
    var start_date = new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000));
    var end_date = new Date();
    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
      }
    const date1 = new Date('09/24/2021');
    const date2 = new Date('10/01/2021');
    console.log(getDifferenceInDays(date1, date2));

    function getDates(startDate, endDate) {
        const dates = []
        let currentDate = startDate
        const addDays = function (days) {
            const date = new Date(this.valueOf())
            date.setDate(date.getDate() + days)
            return date
        }
        while (currentDate <= endDate) {
            dates.push(currentDate)
            currentDate = addDays.call(currentDate, 1)
        }
        setDatesevenmanas(dates);
    }
    useEffect(() => {
        var start_date_new;
        var dd_new;
        var mm_new;
        var yyyy_new;
        var end_date_new;
        var dd_new_end;
        var mm_new_end;
        var yyyy_new_end;
        if ((start_date && start_date !== '' && start_date !== null) && (end_date && end_date !== '' && end_date !== null)) {
            start_date_new = start_date
            dd_new = start_date_new.getDate();
            mm_new = start_date_new.getMonth() + 1;
            if (dd_new < 10) { dd_new = '0' + dd_new }
            if (mm_new < 10) { mm_new = '0' + mm_new }
            yyyy_new = start_date_new.getFullYear();

            end_date_new = end_date
            dd_new_end = end_date_new.getDate();
            mm_new_end = end_date_new.getMonth() + 1;
            if (dd_new_end < 10) { dd_new_end = '0' + dd_new_end }
            if (mm_new_end < 10) { mm_new_end = '0' + mm_new_end }
            yyyy_new_end = end_date_new.getFullYear();
        } else {
            start_date_new = new Date();
            dd_new = start_date_new.getDate();
            mm_new = start_date_new.getMonth() + 1;
            yyyy_new = start_date_new.getFullYear();

            end_date_new = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
            dd_new_end = end_date_new.getDate();
            mm_new_end = end_date_new.getMonth() + 1;
            yyyy_new_end = end_date_new.getFullYear();

        }
       // console.log("From Date", yyyy_new, mm_new, dd_new);
        //console.log("To Date", yyyy_new_end, mm_new_end, dd_new_end);
        getDates(new Date(yyyy_new, mm_new, dd_new), new Date(yyyy_new_end, mm_new_end, dd_new_end));
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    //console.log("Manas", datesevenmanas);

    return (
        <>
            <h1>Hello</h1>
            <div style={{marginTop:'70px'}}>
                {
                    datesevenmanas.map((datenew, index) =>
                        <h5 key={index}>{datenew.toString()}</h5>
                    )
                }
            </div>
        </>
    )
}

export default Test;