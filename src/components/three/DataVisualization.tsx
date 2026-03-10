"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DataVisualization() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous path

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        // Create sample data matching Tellora's ROI simulator concept
        const data = Array.from({ length: 20 }, (_, i) => ({
            month: i,
            value: 10 + Math.pow(i, 1.5) + (Math.random() * 20),
        }));

        const xScale = d3.scaleLinear()
            .domain([0, 19])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) as number])
            .range([height - 10, 10]);

        // Create gradient
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", yScale(0))
            .attr("x2", 0).attr("y2", yScale(d3.max(data, d => d.value) as number));

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#F57C00") // Primary
            .attr("stop-opacity", 0.2);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FFA726") // Light
            .attr("stop-opacity", 1);


        const line = d3.line<{ month: number, value: number }>()
            .x(d => xScale(d.month))
            .y(d => yScale(d.value))
            .curve(d3.curveCatmullRom.alpha(0.5));

        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 4)
            .attr("stroke-linecap", "round")
            .attr("d", line);

        const length = path.node()?.getTotalLength() || 0;

        // Setup for animation
        path.attr("stroke-dasharray", length + " " + length)
            .attr("stroke-dashoffset", length);

        // GSAP Animation drawing the line
        gsap.to(path.node(), {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: svgRef.current,
                start: "top 80%",
            } // If scrollTrigger is not loaded we just animate on mount
        });

        // Add glowing dots at data points
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.month))
            .attr("cy", d => yScale(d.value))
            .attr("r", 0)
            .attr("fill", "#fff")
            .style("filter", "drop-shadow(0px 0px 5px #F57C00)");

        gsap.to(svg.selectAll(".dot").nodes(), {
            r: 4,
            duration: 0.5,
            stagger: 3 / 20,
            ease: "back.out(1.7)"
        });

    }, []);

    return (
        <div className="w-full h-full min-h-[150px] relative">
            <svg ref={svgRef} className="w-full h-full overflow-visible" />
        </div>
    );
}
