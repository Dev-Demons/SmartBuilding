import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Marquee } from "../general/marquee/Marquee.jsx";
import { ContentContext } from "../../context/ContentContext.js";
import ArrowDown from "../svg/ArrowDown.svg";
import { DataContext } from "../../context/DataContext.js";

export const Agenda = () => {
  const contentData = useContext(ContentContext);

  const content = contentData?.data;

  const { data } = useContext(DataContext);
  const events =
    data?.agenda?.data.map((evt) => {
      const date = new Date(evt.start_at);

      var month = date.getUTCMonth() + 1; //months from 1-12
      var day = date.getUTCDate();
      var year = (date.getUTCFullYear() + "").substring(2);

      const dateFormatted = year + "/" + month + "/" + day;

      const minutes = (date.getUTCHours() + "0").substring(0, 2);
      const hours = (date.getUTCHours() + "0").substring(0, 2); // || "24"; //todo test?
      const timeUTC = hours + ":" + minutes + " UTC";
      return {
        ...evt,
        date,
        timeUTC,
        dateFormatted,
      };
    }) || [];

  const dates =
    events
      ?.reduce((acc, curr) => {
        const { dateFormatted } = curr;
        if (!acc.includes(dateFormatted)) acc.push(dateFormatted);
        return acc;
      }, [])
      .sort() || [];

  const [currentDate, setCurrentDate] = useState(dates[0]);

  const eventsGrouped = events?.reduce((arr, evt) => {
    if (evt.dateFormatted === currentDate) {
      const location = evt.estate_name;
      if (!arr[location]) arr[location] = [];

      arr[location].push(evt);
    }
    return arr;
  }, {});

  useEffect(() => {
    if (dates && !currentDate) {
      setCurrentDate(dates[0]);
    }
  }, [dates, currentDate]);

  return (
    <section id="agenda" className={"agenda"}>
      <Marquee>
        {content?.agenda?.title} <ArrowDown />
      </Marquee>
      <ul className="agenda__dates">
        {dates.map((date, index) => (
          <li
            key={index}
            className={date === currentDate ? "active" : ""}
            data-date={date}
            onClick={() => setCurrentDate(date)}
          >
            {date}
          </li>
        ))}
      </ul>
      <div className="agenda__events">
        {Object.keys(eventsGrouped).map((key, index) => (
          <>
            {key !== "null" && <h3>{key}</h3>}

            {eventsGrouped[key].map((item, itemIndex) => (
              <div key={index + "-" + itemIndex} className={"event " + (itemIndex === eventsGrouped[key].length - 1 ? "last" : "")}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <time dateTime={item.start_at}>{item.timeUTC}</time>
                <a
                  href={`https://events.decentraland.org/event/?id=${item.id}`}
                  target={"_blank"}
                >
                  {content?.agenda?.cta}
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.9585 9.5H15.0418"
                      stroke="#FDC5DB"
                      strokeWidth="1.97403"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 3.9585L15.0417 9.50016L9.5 15.0418"
                      stroke="#FDC5DB"
                      strokeWidth="1.97403"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </>
        ))}
      </div>
    </section>
  );
};
