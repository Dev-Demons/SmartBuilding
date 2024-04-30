import * as React from "react";
import { ContentContext } from "../../context/ContentContext.js";
import { useContext } from "react";

const isBrowser = typeof window !== "undefined";
export const Footer = () => {
  const { data } = useContext(ContentContext);
  const footer = data?.footer;

  const handleClick = (e, id) => {
    e.preventDefault();

    if (isBrowser) {
      let element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer>
      <div className={"footer__background"}>
        <svg
          width="1920"
          height="519"
          viewBox="0 0 1920 519"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_2468_1432)">
            <ellipse
              cx="960.5"
              cy="420.444"
              rx="2376.5"
              ry="803"
              fill="url(#paint0_radial_2468_1432)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2468_1432"
              x="-1452"
              y="-418.556"
              width="4825"
              height="1678"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="18"
                result="effect1_foregroundBlur_2468_1432"
              />
            </filter>
            <radialGradient
              id="paint0_radial_2468_1432"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(961.25 421.061) rotate(90.0535) scale(802.384 3124.54)"
            >
              <stop offset="0.328125" stopColor="white" />
              <stop offset="0.40625" stopColor="#E4708C" />
              <stop offset="0.53125" stopColor="#BE3455" />
              <stop offset="0.661458" />
              <stop offset="0.822917" stopColor="#BE3455" />
              <stop offset="0.973958" stopColor="#E4708C" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div>
        <div className={"footer__background-image"}>
          <div className={"footer__background-image__desktop"}></div>
          <div className={"footer__background-image__mobile"}></div>
        </div>
        <div className={"footer__links"}>
         {/* <ul className={"links__page"}>
            <li>
              <a href={"#agenda"} onClick={(e) => handleClick(e, "agenda")}>
                Agenda
              </a>
            </li>
             <li><a href={'#maps'} onClick={(e) => handleClick(e, 'maps')}>Maps</a></li>
            <li>
              <a
                href={"#marketplace"}
                onClick={(e) => handleClick(e, "marketplace")}
              >
                MarketPlace
              </a>
            </li>
            <li>
              <a href={"#events"} onClick={(e) => handleClick(e, "events")}>
                Events
              </a>
            </li>
            <li>
              <a href={"#partners"} onClick={(e) => handleClick(e, "partners")}>
                Partners
              </a>
            </li>
            <li>
              <a href={"#faqs"} onClick={(e) => handleClick(e, "faqs")}>
                FAQ
              </a>
            </li>
          </ul>*/}
          <ul className={"links__social"}>
            <li>
              <a href={footer?.twitterUrl}>{footer?.twitter}</a>
            </li>
            <li>
              <a href={footer?.discordUrl}>{footer?.discord}</a>
            </li>
            <li>
              <a href={footer?.githubUrl}>{footer?.github}</a>
            </li>
            <li>
              <a href={footer?.redditUrl}>{footer?.reddit}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
