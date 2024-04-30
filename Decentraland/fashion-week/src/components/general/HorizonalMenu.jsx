import {useEffect, useRef, useState} from 'react';
import * as React from 'react';
export const HorizonalMenu = ({children, onChange})=>{

    const [isOverflowing, setIsOverflowing] = useState(false);
    const scrollRef = useRef();

    useEffect(()=> {
            onChange && onChange({isOverflowing});
    }, [isOverflowing, onChange]);


    useEffect(() => {
        let observer = null;
        let current = null;
        if(scrollRef?.current !== null && observer === null) {
            current = scrollRef.current;
            observer = new ResizeObserver(()=>{
                const offsetWidth = current.offsetWidth;
                const containerWidth = current.parentNode.offsetWidth;
                setIsOverflowing(offsetWidth > containerWidth);
            });

            observer.observe(scrollRef.current)
            observer.observe(scrollRef.current.parentNode)
        }

        return ()=>{
            if(current) {
                observer?.unobserve(current)
                observer?.unobserve(current.parentNode)
            }
        }
    }, [scrollRef])

    return (
        <div ref={scrollRef}>
            {children}
        </div>
    )

}
