import * as React from "react";
import { useRef } from "react";


function FirstSvg({ weight }) {
  const svgRef = useRef(null);

  // Function to calculate path values based on the weight
  

  return (
    <svg
      viewBox="-1 -1 250 96"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <mask id="a" x={0} y={0}>
        <path
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          d={`M142 62h-36`}
        />
      </mask>
      <mask id="finialscnbrle7useufw1gir8p9k0m0" x="0" y="0"></mask>
      <g mask="url(#ironwoodasdxy34dc0l9jzqyiuw0j3ix)">
        <path
          d="M142 12v70h-36V12h36z"
          className="fill-transparent text-c-brown"
        />
      </g>

      <g mask="url(#a)">
        <path d="M142 12v70h-36V12h36z" />
      </g>
      <path
        d="M142 12v70h-36V12h36z"
        className="stroke-current text-c-1000"
        fill="none"
        strokeWidth={2}
        stroke="black"
      />
    </svg>
  );
}

export default FirstSvg;
