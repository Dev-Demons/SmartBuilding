import {useIntersectionObserver} from 'react-intersection-observer-hook';
import {useEffect, useState} from 'react';

export const useIsVisible = () => {

    const [ref, {entry}] = useIntersectionObserver({threshold: 0.5});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let visible = (entry && entry.isIntersecting);
        setIsVisible(isVisible || visible);
    }, [entry, isVisible])

    return {ref, isVisible};
}
