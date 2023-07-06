import React, { useEffect, useState } from 'react'
import { ResponsiveTimeRange } from '@nivo/calendar'
import axios from "axios";


function MonthlyOverview() {

    const [totConMat, setTotConMat] = useState();
    // const [todayDate, setTodayDate] = useState();
    // const [pastDate, setPastDate] = useState();

    let currentDate = new Date();
    let pastDate = new Date(currentDate);

    pastDate.setMonth(pastDate.getMonth() - 4);
    currentDate.setDate(currentDate.getDate() + 1);

    let formattedCurrentDate = currentDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    let formattedPastDate = pastDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    console.log(currentDate);

    /**
   * Get the ship table data and create a new var formatted which contains the date and
   * total number of recyclables for each shipment
   */
    useEffect(() => {
        // calcDate();
        axios
            .get(`http://localhost:5000/api/ship`)
            .then((response) => {
                databaseError(response);

                let formattedShipData = response.data.map((row) => (
                    {
                        "value": row.TotalConcurrentMaterials,
                        "day": new Date(row.ShipmentDate).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })
                    }
                ));
                // console.log("Response: ", formattedShipData)
                setTotConMat(formattedShipData);
            });
    }, []);

    function calcDate() {
        let currentDate = new Date();
        let pastDate = new Date(currentDate);

        pastDate.setMonth(pastDate.getMonth() - 4);

        let formattedCurrentDate = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        let formattedPastDate = pastDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        // console.log(formattedCurrentDate);
        // console.log(formattedPastDate);

    }

    function databaseError(response) {
        for (let i = 0; i < response.length; i++) {
            if (response[i].status === 500) {
                console.log("Request failed");
            }
            else if (response === 200) {
                console.log("Success");
            }
        }
    }

    return (
        // <div style={{ height: '200px' }}>
        <>
            {totConMat && totConMat.length > 0 ? (
                <div className="h-[10rem] md:h-[16rem]">
                    <ResponsiveTimeRange
                        margin={{ top: 40, right: 10, bottom: 40, left: 40 }}
                        data={totConMat}
                        minValue='auto'
                        maxValue={5000}
                        from={formattedPastDate}
                        to={formattedCurrentDate}

                        emptyColor="#eeeeee"
                        // colors={['#86efac', '#F9ADA0', '#FFEE70', '#99E1D9']} //#FFA3AF, #bef264
                        colors={['#474973', '#8E94F2', '#A4E4DC', '#73d9a2']} //#99E1D9
                        dayBorderWidth={2}
                        dayBorderColor="#ffffff"
                        dayRadius={4}


                        legends={[
                            {
                                itemCount: 4,
                                anchor: 'bottom',
                                direction: 'row',
                                itemsSpacing: 20,
                                itemDirection: 'right-to-left',
                                justify: 'right',

                                itemWidth: 42,
                                itemHeight: 42,
                                translateX: -45,
                                translateY: -30,
                            }
                        ]}
                    />
                </div>
            ) : (
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc0c6b69321565.5b7d0cbe723b5.gif" className="opacity-30 flex justify-center" />
            )}


        </>
    )
}

export default MonthlyOverview