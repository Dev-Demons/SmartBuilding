import {ContentContext} from '../../context/ContentContext.js';
import * as React from 'react';
import {useContext, useRef, useState} from 'react';
import {DataContext} from '../../context/DataContext.js';
import {HorizonalMenu} from '../general/HorizonalMenu.jsx';

export const Events = () => {

    const content = useContext(ContentContext);

    const eventsContent = content?.data?.events;
    const title = eventsContent?.title;

    const {data} = useContext(DataContext);
    const events = data?.agenda?.data.map(evt => {
        const date = new Date(evt.start_at)

        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        const dateFormatted = year + '/' + month + '/' + day;

        const minutes = (date.getUTCHours() + '0').substring(0, 2);
        const hours = (date.getUTCHours() + '0').substring(0, 2);// || "24"; //todo test?
        const timeUTC = hours + ':' + minutes + ' UTC';

        const coordinate = '(' + evt.coordinates[0] + ',' + evt.coordinates[1] + ')';
        return {
            ...evt,
            coordinate,
            date,
            timeUTC,
            dateFormatted
        }
    }) || []

    const [isOverflowing, setIsOverflowing] = useState(false);

    const handleOverflow = ({isOverflowing}) => {
        setIsOverflowing(isOverflowing);
    }

    const scrollRef = useRef();

    const handleScrollTo = direction => {
        let left = direction === 'left' ? -scrollRef.current.parentNode.offsetWidth / 2 : scrollRef.current.parentNode.offsetWidth / 2;
        left += scrollRef.current.scrollLeft;
        scrollRef.current.scrollTo({left, behavior: 'smooth'})
    }

    return (events.length &&
        <section id={'events'}>
            <div className={'events__title'}>

                {isOverflowing && (
                    <button className={'button__arrow'} name={'scroll-left'} onClick={() => handleScrollTo('left')}>
                        <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 25L1 13L13 1" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

                <h2>{title}</h2>

                {isOverflowing && (
                    <button className={'button__arrow'} name={'scroll-right'} onClick={() => handleScrollTo('right')}>
                        <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13L1 25" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

            </div>
            <div className={'events__items ' + (isOverflowing ? 'scrolling' : '')} ref={scrollRef}>
                <HorizonalMenu onChange={handleOverflow}>
                    {events.map((item, index) => (
                        <div key={index} className={'item'}
                             onClick={() => window.location.href = `https://events.decentraland.org/event/?id=${item.id}`}>
                            <div className={'item__image'}>
                                <div style={{'backgroundImage': 'url(' + item.image + ')'}}></div>
                            </div>
                            <div className={'item__text'}>
                                <div>{item.name}</div>
                                <div>{item.coordinate}</div>
                                <button
                                    onClick={() => window.location.href = `https://events.decentraland.org/event/?id=${item.id}`}>
                                    <a href={`https://events.decentraland.org/event/?id=${item.id}`} target={'_blank'}
                                       rel={'noreferrer'}>{eventsContent?.cta}</a></button>
                            </div>
                        </div>
                    ))}
                </HorizonalMenu>
            </div>
        </section>
    )

}
