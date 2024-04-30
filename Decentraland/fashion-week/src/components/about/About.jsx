import {Marquee} from '../general/marquee/Marquee.jsx';
import ArrowDown from '../svg/ArrowDown.svg';
import {ContentContext} from '../../context/ContentContext.js';
import * as React from 'react';
import {useContext} from 'react';
import {useIsVisible} from '../hooks/useIsVisible.jsx';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const About = () => {

    const {ref, isVisible} = useIsVisible();

    const {data} = useContext(ContentContext);
    const about = data?.about;
    const title = about?.title;

    return (
        <section id={'about'} ref={ref} className={isVisible ? 'visible' : ''}>
            <Marquee>
                {title} <ArrowDown/>
            </Marquee>
            <div className={'about__text'}>
                <div>
                    <p>{about?.description}</p>
                    <div className={'text__image'}>
                        <div>
                            <picture>
                                <img
                                    sizes="(max-width: 1400px) 100vw, 1400px"
                                    srcSet="
Frame_427319509_fuzd9n_c_scale,w_200.png 200w,
Frame_427319509_fuzd9n_c_scale,w_423.png 423w,
Frame_427319509_fuzd9n_c_scale,w_580.png 580w,
Frame_427319509_fuzd9n_c_scale,w_710.png 710w,
Frame_427319509_fuzd9n_c_scale,w_840.png 840w,
Frame_427319509_fuzd9n_c_scale,w_945.png 945w,
Frame_427319509_fuzd9n_c_scale,w_1027.png 1027w,
Frame_427319509_fuzd9n_c_scale,w_1122.png 1122w,
Frame_427319509_fuzd9n_c_scale,w_1209.png 1209w,
Frame_427319509_fuzd9n_c_scale,w_1294.png 1294w,
Frame_427319509_fuzd9n_c_scale,w_1362.png 1362w,
Frame_427319509_fuzd9n_c_scale,w_1400.png 1400w"
                                    src="Frame_427319509_fuzd9n_c_scale,w_1400.png"
                                    alt=""/>
                            </picture>
                        </div>
                    </div>
                    <div className={'text__details'}>
                        {documentToReactComponents(about?.details)}
                    </div>
                </div>
            </div>
        </section>
    )
}
