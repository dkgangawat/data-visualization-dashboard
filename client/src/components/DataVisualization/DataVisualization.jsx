import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DataVisualization = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const container = d3.select(containerRef.current);

    // Set up scales for responsive design
    const width = container.node().getBoundingClientRect().width - 50;
    const height = 400;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .nice()
      .range([height, 0]);

    // Add intensity bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d.intensity))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.intensity))
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        // Example hover effect: Change bar color on hover
        d3.select(event.target).attr("fill", "orange");
      })
      .on("mouseout", (event, d) => {
        // Restore bar color on mouseout
        d3.select(event.target).attr("fill", "blue");
      });

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <div ref={containerRef} className="w-full max-w-screen-lg mx-auto">
      <svg ref={svgRef} className="w-full" height={400}></svg>
    </div>
  );
};

export default DataVisualization;
