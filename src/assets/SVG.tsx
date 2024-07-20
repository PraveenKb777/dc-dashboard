import { FC } from "react";

export const SingleArrow: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <mask id={props.id || "a"} x={0} y={0} width={16} height={16}>
      <path fill={props.fill || "#D9D9D9"} d="M0 0h16v16H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        d="M8.4 8 5.333 4.933 6.267 4l4 4-4 4-.934-.933z"
        fill={props.fill || "#fff"}
      />
    </g>
  </svg>
);

export const TripleArrow: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={16}
    viewBox="0 0 32 16"
    fill="none"
    {...props}
  >
    <mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={16}
    >
      <path fill={props.fill || "#D9D9D9"} d="M0 0h16v16H0z" />
    </mask>
    <g mask="url(#a)">
      <path d="M8.4 8 5.333 4.933 6.267 4l4 4-4 4-.934-.933z" fill="#fff" />
    </g>
    <mask
      id="b"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={8}
      y={0}
      width={16}
      height={16}
    >
      <path fill={props.fill || "#D9D9D9"} d="M8 0h16v16H8z" />
    </mask>
    <g mask="url(#b)">
      <path d="m16.4 8-3.067-3.067.934-.933 4 4-4 4-.934-.933z" fill="#fff" />
    </g>
    <mask
      id="c"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={16}
      y={0}
      width={16}
      height={16}
    >
      <path fill={props.fill || "#D9D9D9"} d="M16 0h16v16H16z" />
    </mask>
    <g mask="url(#c)">
      <path d="m24.4 8-3.067-3.067.934-.933 4 4-4 4-.934-.933z" fill="#fff" />
    </g>
  </svg>
);
