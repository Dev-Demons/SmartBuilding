import {ContentContext} from '../../context/ContentContext.js';
import * as React from 'react';
import {useContext} from 'react';
import {Marquee} from '../general/marquee/Marquee.jsx';
import ArrowDown from '../svg/ArrowDown.svg';

export const Partners = () => {

    const {data} = useContext(ContentContext);
    const partners = data?.partner || [];
    return partners.length &&
        (<section id={'partners'}>
            <Marquee>
                {data?.partners?.title} <ArrowDown/>
            </Marquee>

            <div className={'partners__grid'}>
                {partners?.map((item, index) => (
                    <div key={index}
                         style={{backgroundImage: 'url("' + item.image.fields.file.url + '")'}}></div>
                ))}
            </div>
        </section>)


}
