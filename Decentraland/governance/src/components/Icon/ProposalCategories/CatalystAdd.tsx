interface Props {
  size?: number
}

export default function CatalystAdd({ size }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="24" fill="#D4EEC5"></circle>
      <path
        fill="#44B600"
        fillRule="evenodd"
        d="M15.818 14h16.364A1.82 1.82 0 0134 15.818v2.728a1.82 1.82 0 01-1.818 1.818H15.818A1.82 1.82 0 0114 18.545v-2.727A1.82 1.82 0 0115.818 14zm1.364 4.546a.454.454 0 00.454-.455v-1.818a.454.454 0 10-.909 0v1.818c0 .251.203.454.455.454zm2.273-.455a.454.454 0 11-.91 0v-1.818a.454.454 0 11.91 0v1.818zm1.363.454a.454.454 0 00.455-.454v-1.818a.454.454 0 10-.91 0v1.818c0 .251.204.454.455.454zm6.818-.454a.91.91 0 010-1.818.91.91 0 010 1.818zm1.819-.91a.91.91 0 001.818 0 .91.91 0 00-1.819 0zm-13.637 3.637h16.364A1.82 1.82 0 0134 22.636v2.728c0 .326-.087.633-.238.899A6.001 6.001 0 0032 26c-1.34 0-2.578.44-3.576 1.182H15.818A1.82 1.82 0 0114 25.364v-2.728a1.82 1.82 0 011.818-1.818zM26 32c0-1.72.723-3.27 1.882-4.364H15.818A1.82 1.82 0 0014 29.455v2.727A1.82 1.82 0 0015.818 34h10.523A5.99 5.99 0 0126 32zm-8.818-6.636a.454.454 0 00.454-.455v-1.818a.454.454 0 10-.909 0v1.818c0 .251.203.455.455.455zm2.273-.455a.454.454 0 11-.91 0v-1.818a.454.454 0 11.91 0v1.818zm1.363.455a.454.454 0 00.455-.455v-1.818a.454.454 0 10-.91 0v1.818c0 .251.204.455.455.455zm6.818-.455a.91.91 0 010-1.818.91.91 0 010 1.818zM29.455 24c0 .501.408.91.909.91a.91.91 0 00.909-.91.91.91 0 00-.91-.91.91.91 0 00-.909.91zm-11.819 7.727a.454.454 0 11-.909 0V29.91a.454.454 0 11.91 0v1.818zm1.364.455a.454.454 0 00.454-.455V29.91a.454.454 0 10-.909 0v1.818c0 .252.204.455.455.455zm2.273-.455a.454.454 0 11-.91 0V29.91a.454.454 0 11.91 0v1.818zM32 37a5 5 0 100-10 5 5 0 000 10zm-.5-7.5v2h-2v1h2v2h1v-2h2v-1h-2v-2h-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}
