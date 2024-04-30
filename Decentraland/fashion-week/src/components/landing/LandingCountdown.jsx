import Star from '../svg/Star.svg';
import * as React from 'react';
import {useEffect, useState} from 'react';

export const LandingCountdown = ({end}) => {

    const [countDown, setCountDown] = useState(null);

    useEffect(() => {

        if (end) {
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var timer;

            function showRemaining() {
                var now = new Date();
                var distance = end - now;
                if (distance < 0) {

                    clearInterval(timer);
                    setCountDown(null);

                    return;
                }
                var days = Math.floor(distance / _day);
                var hours = Math.floor((distance % _day) / _hour);
                var minutes = Math.floor((distance % _hour) / _minute);
                var seconds = Math.floor((distance % _minute) / _second);

                setCountDown({days, hours, minutes, seconds});
            }

            timer = setInterval(showRemaining, 1000);

            return () => clearInterval(timer);
        }
    }, [end, setCountDown])

    //todo add content to cms..

    return countDown && (

        <div className={'landing__countdown'}>
            <div>
                <div>{countDown.days}</div>
                <div>DAYS</div>
            </div>
            <Star/>
            <div>
                <div>{countDown.hours}</div>
                <div>HOURS</div>
            </div>
            <Star/>
            <div>
                <div>{countDown.minutes}</div>
                <div>MINUTES</div>
            </div>
            <Star/>
            <div>
                <div>{countDown.seconds}</div>
                <div>SECONDS</div>
            </div>
        </div>
    )


}
