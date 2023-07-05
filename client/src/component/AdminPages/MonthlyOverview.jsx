import React from 'react'
import { ResponsiveTimeRange } from '@nivo/calendar'


function MonthlyOverview({ data }) {

    console.log("NEW",data)

    return (
        <div style={{ height: '200px' }}>
            <ResponsiveTimeRange
                margin={{ top: 40, right: 10, bottom: 40, left: 40 }}
                data={data}
                from="2023-07-01"
                to="2023-11-30"
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
            />
        </div>
    )
}

export default MonthlyOverview