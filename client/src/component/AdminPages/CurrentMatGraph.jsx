import React, { useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

function CurrentMatGraph({ data }) {
  // const data = [
  //   [
  //     { x: 0, y: 4 },
  //     { x: 1, y: 8 },
  //     { x: 2, y: 5 },
  //     { x: 3, y: 12 },
  //     { x: 4, y: 6 },
  //   ],
  //   [
  //     { x: 0, y: 7 },
  //     { x: 1, y: 2 },
  //     { x: 2, y: 9 },
  //     { x: 3, y: 5 },
  //     { x: 4, y: 11 },
  //   ],
  // ];

  useEffect(() => {
    console.log("Oreo");
    console.log("Data:", data);
    console.log("Oreo");
  }, []);

  const newTheme = {
    fontFamily: 'Segoe UI',
    textColor: '#71717a'
  };

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data.map((series, index) => ({
          id: `series${index + 1}`, data: series
        }))} // transforming the 'data' array by mapping over each element and creating a new object with an 'id' property that combines the text 'series' with the index plus 1, and a 'data' property set to the value of the current element
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'linear' }}
        yScale={{
          type: 'linear',
          min: '0',
          max: 'auto',
        }}
        yFormat='>-#.2f'
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'Deposited Recyclables',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        axisBottom={{
          tickValues: 5,
          tickPadding: 5,
          legend: 'Date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        // axisTop={{
        //   tickValues: 0,
        //   legend: 'Deposited Recyclables',
        //   legendOffset: -40,
        //   legendPosition: 'left',

        // }}

        enableGridX={false}
        enableGridY={true}

        enablePoints={true}
        pointSize={7}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}

        curve="linear"

        useMesh={true}

        colors={['#60a5fa', '#6366f1', '#a78bfa', '#6ee7b7']}

        theme={newTheme}
      />
    </div>
  );
}

export default CurrentMatGraph;
