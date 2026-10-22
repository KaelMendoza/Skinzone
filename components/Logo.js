export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M18 18h28c7 0 11 6 13 16l3 12c1 5-2 9-7 9-3 0-5-1-7-4l-4-5H20l-4 5c-2 3-4 4-7 4-5 0-8-4-7-9l3-12c2-10 6-16 13-16z" fill="#8ab4f8" />
      <path d="M18 18h28c4 0 7 2 9 6H9c2-4 5-6 9-6z" fill="#bfe0ff" />
      <rect x="17" y="27" width="4" height="12" rx="2" fill="#fff" />
      <rect x="13" y="31" width="12" height="4" rx="2" fill="#fff" />
      <circle cx="42" cy="29" r="3" fill="#fff" />
      <circle cx="49" cy="35" r="3" fill="#dbeeff" />
      <circle cx="35" cy="35" r="3" fill="#dbeeff" />
      <circle cx="42" cy="41" r="3" fill="#fff" />
    </svg>
  );
}
