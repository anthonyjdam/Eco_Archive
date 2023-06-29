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

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data.map((series, index) => ({ id: `series${index + 1}`, data: series }))}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickValues: 5,
          legend: 'Days',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickValues: 5,
          legend: 'Total Material DSeposited',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        enableGridX={false}
        enableGridY={true}
        enablePoints={true} // Enable data points
        pointSize={10} // Adjust the size of the data points
        enablePointLabel={true} // Enable hoverable labels for data points
        pointLabel="y" // Specify the value to display on hover (here, 'y' value)
        pointLabelYOffset={-12} // Adjust the vertical offset of the hover labels
        curve="cardinal"
        colors={{ scheme: 'nivo' }}
      />
    </div>
  );
}

export default CurrentMatGraph;
