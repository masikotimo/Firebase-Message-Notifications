import React from 'react'
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { useEffect,useState } from 'react';

const axios = require('axios');
const baseUrl = 'https://carbooking-api-3dx.herokuapp.com/';

export default function Date() {
    const [time, setTime] = useState([]);
    const [isLoaded, setIsLoaded] = useState(0);
    useEffect(() => getDriverTimes(), [isLoaded]);

    const getDriverTimes=async()=>{
        axios
          .post(`${baseUrl}get-driver-time/`, {
            driver: 'fe83e448-f938-432d-bc65-a739ee4b196f',
            
          })
          .then(async (response) => {
            setTime(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    

    
    // const yesterday = moment().subtract(1, 'day');
    // const disablePastDt = current => {
    //     return current.isAfter(yesterday);
    // };

    // // disable future dates
    // const today = moment();
    // const disableFutureDt = current => {
    //     return current.isBefore(today)
    // }

    // // disable weekends
    // const disableWeekends = current => {
    //     return current.day() !== 0 && current.day() !== 6;
    // }

    // disable the list of custom dates
    const dates=time.map((item)=> moment(item).format(moment.HTML5_FMT.DATE));

    const customDates = dates
    const disableCustomDt = current => {


        return !customDates.includes(current.format('YYYY-MM-DD'));
    }

    return (
        <div>
            <p className="title">Disable the list of custom dates: <small>(2021-10-08, 2021-10-04, 2021-10-02)</small></p>
            <DatePicker
                timeFormat={false}
                isValidDate={disableCustomDt}
            />

        </div>
    )
}
