import React from 'react';

export default function FaIcon() {
  return (
    <svg
      width="117.239990234375px"
      height="122.021240234375px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="191.3800048828125 13.9893798828125 117.239990234375 122.021240234375"
      style={{ background: 'rgba(0, 0, 0, 0)' }}
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <filter id="editing-extrusion" x="-100%" y="-100%" width="300%" height="300%">
          <feFlood result="color1" floodColor="#000"></feFlood>
          <feConvolveMatrix
            order="8,8"
            divisor="1"
            kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
            in="SourceAlpha"
            result="extrude"
          ></feConvolveMatrix>
          <feComposite in="color1" in2="extrude" result="comp-extrude" operator="in"></feComposite>
          <feOffset dx="4" dy="4" in="comp-extrude" result="offset-extrude"></feOffset>
          <feMerge>
            <feMergeNode in="offset-extrude"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
          <feDropShadow dx="-1" dy="-1" stdDeviation="0" floodColor="#000"></feDropShadow>
          <feDropShadow dx="1" dy="-1" stdDeviation="0" floodColor="#000"></feDropShadow>
          <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="#000"></feDropShadow>
          <feDropShadow dx="-1" dy="1" stdDeviation="0" floodColor="#000"></feDropShadow>
        </filter>
      </defs>
      <g filter="url(#editing-extrusion)">
        <g transform="translate(215.37999829649925, 96.75218772888184)">
          <path
            d="M30.21-33.92L30.21-33.92L30.21-33.92Q25.02-33.92 21.25-35.65L21.25-35.65L19.20-25.28L31.55-25.28L31.55-25.28Q31.55-21.89 29.86-19.74L29.86-19.74L29.86-19.74Q28.16-17.60 25.09-17.60L25.09-17.60L25.09-17.60Q21.76-17.60 18.69-18.82L18.69-18.82L18.69-18.82Q18.05-19.07 17.98-19.14L17.98-19.14L14.34 0L0.38 0L8.51-42.24L37.06-42.24L37.06-42.24Q37.06-38.34 35.23-36.13L35.23-36.13L35.23-36.13Q33.41-33.92 30.21-33.92ZM61.82 1.28L61.82 1.28L61.82 1.28Q53.63 1.28 52.86-10.37L52.86-10.37L41.86-10.37L41.86-10.37Q40.58-7.42 39.68-4.86L39.68-4.86L38.02 0L29.06 0L49.22-42.24L62.98-42.24L65.66-11.14L65.66-11.14Q66.30-4.42 68.86-2.43L68.86-2.43L68.86-2.43Q67.01 1.28 61.82 1.28ZM47.36-23.17L43.84-15.04L52.67-15.04L51.90-31.49L51.90-33.22L47.36-23.17Z"
            fill="#fff"
          ></path>
        </g>
      </g>
    </svg>
  );
}
