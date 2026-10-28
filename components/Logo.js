export default function Logo({ size = 40 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb347" />
          <stop offset="1" stopColor="#ff5e00" />
        </linearGradient>
      </defs>
      <g className="logo-body">
        <path d="M18 18h28c7 0 11 6 13 16l3 12c1 5-2 9-7 9-3 0-5-1-7-4l-4-5H20l-4 5c-2 3-4 4-7 4-5 0-8-4-7-9l3-12c2-10 6-16 13-16z" fill="url(#lg)" stroke="#111" strokeWidth="2.5" />
        <rect x="17" y="27" width="4" height="12" rx="2" fill="#111" />
        <rect x="13" y="31" width="12" height="4" rx="2" fill="#111" />
        <circle className="b b1" cx="42" cy="29" r="3.2" fill="#111" />
        <circle className="b b2" cx="49" cy="35" r="3.2" fill="#111" />
        <circle className="b b3" cx="35" cy="35" r="3.2" fill="#111" />
        <circle className="b b4" cx="42" cy="41" r="3.2" fill="#111" />
      </g>
    </svg>
  );
}
