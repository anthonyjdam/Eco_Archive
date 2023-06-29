import React, { useEffect } from 'react';
import * as d3 from 'd3';
import AdminDashboard from './AdminDashboard';

function CurrentMatGraph({ data, width, height }) {
    useEffect(() => {
        console.log("Oreo");
        console.log("Data:", data);
        console.log("Oreo");
    }, [data]);

    useEffect(() => {
        console.log("The data: " + data)
    }, []);

      if (!data) {
        return null; // or a loading indicator, error message, etc.
      }
    // let dummyData = [
    //     [0, 10],
    //     [5, 50],
    //     [15, 75],
    //     [55, 100],
    //     [75, 10],
    //     [100, 5],
    //     [120, 50]
    // ]

    // let dummyData = [
    //     [29, 50],
    //     [30, 50],
    //     [31, 20]
    // ]

    let margin = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
    }

    let xScale = d3.scaleLinear()
    .domain(d3.extent(dummyData.map((d) => d[0])))
    .range([margin.left, width - margin.right])

    let yScale = d3.scaleLinear()
    .domain(d3.extent(dummyData.map((d) => d[1])))
    .range([height - margin.bottom, margin.top])

    const line = d3.line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

    // const line = d3.line()

    return (
        <>
            {/* viewBox={`0 0 ${width} ${height}`} */}
            <svg className='bg-gray-100' > 
                <path fill="none" stroke="#9ecafd" strokeWidth={2} d={line(dummyData)} />
            </svg>
        </>
    );
}

export default CurrentMatGraph;
