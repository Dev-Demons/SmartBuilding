import * as React from "react";
import { useContext, useState } from "react";
import { ContentContext } from "../../context/ContentContext.js";
import LogoSVG from "../svg/Logo.svg";

const isBrowser = typeof window !== "undefined";

export const Header = () => {
  const { data } = useContext(ContentContext);
  const header = data?.header;

  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    setShowOverlay(false);
    if (isBrowser) {
      let element = document.getElementById(id);
      if(element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <header>
        <ul>
          <li>
            <a href={"#agenda"} onClick={(e) => handleClick(e, "agenda")}>
              {header?.agenda}
            </a>
          </li>
          <li>
            <a href={"#maps"} onClick={(e) => handleClick(e, "maps")}>
              {header?.maps}
            </a>
          </li>
          <li>
            <a
              href={"#marketplace"}
              onClick={(e) => handleClick(e, "marketplace")}
            >
              {header?.marketplace}
            </a>
          </li>
          <li>
            <a href={"#landing"} onClick={(e) => handleClick(e, "landing")}>
              <LogoSVG />
            </a>
          </li>
          <li>
            <a href={"#events"} onClick={(e) => handleClick(e, "events")}>
              {header?.events}
            </a>
          </li>
          <li>
            <a href={"#partners"} onClick={(e) => handleClick(e, "partners")}>
              {header?.partners}
            </a>
          </li>
          <li>
            <a href={"#faqs"} onClick={(e) => handleClick(e, "faqs")}>
              {header?.faqs}
            </a>
          </li>
        </ul>

        <div className={"header__mobile " + (showOverlay ? "visible" : "")}>
          <LogoSVG />
          <button
            className={"button-close"}
            onClick={() => {
              setShowOverlay(!showOverlay);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2566_1549)">
                <path
                  d="M6 22.7279L18.7279 9.99998"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.63623 10.136L18.3642 22.864"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2566_1549">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            className={"button-open"}
            onClick={() => {
              setShowOverlay(!showOverlay);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 7.5H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M3 16.5H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <section
        className={"header__mobile_overlay " + (showOverlay ? "visible" : "")}
      >
        <ul>
          <li>
            <a href={"#agenda"} onClick={(e) => handleClick(e, "agenda")}>
              {header?.agenda}
            </a>
          </li>
          <li>
            <a href={"#maps"} onClick={(e) => handleClick(e, "maps")}>
              {header?.maps}
            </a>
          </li>
          <li>
            <a
              href={"#marketplace"}
              onClick={(e) => handleClick(e, "marketplace")}
            >
              {header?.marketplace}
            </a>
          </li>
          <li>
            <a href={"#events"} onClick={(e) => handleClick(e, "events")}>
              {header?.events}
            </a>
          </li>
          <li>
            <a href={"#partners"} onClick={(e) => handleClick(e, "partners")}>
              {header?.partners}
            </a>
          </li>
          <li>
            <a href={"#faqs"} onClick={(e) => handleClick(e, "faqs")}>
              {header?.faqs}
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};
