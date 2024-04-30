import {ContentContext} from '../../context/ContentContext.js';
import * as React from 'react';
import {useContext, useRef, useState} from 'react';
import {MarketPlaceItem} from './MarketPlaceItem.jsx';
import {DataContext} from '../../context/DataContext.js';
import {HorizonalMenu} from '../general/HorizonalMenu.jsx';

export const MarketPlace = () => {

    const content = useContext(ContentContext);

    const data = useContext(DataContext);
    const marketPlace = data?.data?.marketPlace.map(item => {
        return {
            ...item,
            cta : content?.data?.marketplace?.cta
        }
    });

    const [isOverflowing, setIsOverflowing] = useState(false);

    const handleOverflow = ({isOverflowing}) => {
        setIsOverflowing(isOverflowing);
    }

    const scrollRef = useRef();

    const handleScrollTo = direction => {
        let left = direction === "left" ?  -scrollRef.current.parentNode.offsetWidth / 2 : scrollRef.current.parentNode.offsetWidth / 2;
        left += scrollRef.current.scrollLeft;
        scrollRef.current.scrollTo({left, behavior : "smooth"})
    }

    return ( marketPlace &&
        <section id={'marketplace'}>
            <div className={'marketplace__title'}>

                {isOverflowing && (
                    <button name={'scroll-left'}   onClick={()=>handleScrollTo("left")}>
                        <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 25L1 13L13 1" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

                <h2>{content?.data?.marketplace?.title}</h2>

                {isOverflowing && (
                    <button name={'scroll-right'}   onClick={()=>handleScrollTo("right")}>
                        <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13L1 25" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
            </div>
            <div className={'marketplace__products'} ref={scrollRef}>
                <HorizonalMenu onChange={handleOverflow}>
                    {marketPlace && (marketPlace.map((item, index) => (
                        <MarketPlaceItem key={index} item={item} index={index}/>
                    )))}
                </HorizonalMenu>
            </div>
        </section>
    )
}
