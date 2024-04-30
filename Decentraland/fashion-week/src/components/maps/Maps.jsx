import {ContentContext} from '../../context/ContentContext.js';
import {Marquee} from '../general/marquee/Marquee.jsx';
import ArrowDown from '../svg/ArrowDown.svg';
import * as React from 'react';
import {useContext} from 'react';

export const Maps = () => {

    const {data} = useContext(ContentContext);
    const maps = data?.maps;
    const title = maps?.title;

    return (
        <section id="maps">
            <Marquee>
                {title} <ArrowDown/>
            </Marquee>
            <div className={"maps__map maps__map-1"}>
                <picture>
                    <img
                        sizes="(max-width: 2160px) 100vw, 2160px"
                        srcSet="
NeoPlaza_Map_o2spfp_c_scale,w_480.png 480w,
NeoPlaza_Map_o2spfp_c_scale,w_1527.png 1527w,
NeoPlaza_Map_o2spfp_c_scale,w_1629.png 1629w,
NeoPlaza_Map_o2spfp_c_scale,w_1883.png 1883w,
NeoPlaza_Map_o2spfp_c_scale,w_2160.png 2160w"
                        src="NeoPlaza_Map_o2spfp_c_scale,w_2160.png"
                        alt={title}/>
                </picture>
            </div>
            <div className={"maps__map maps__map-2"}>
                <picture>
                    <img
                        sizes="(max-width: 2160px) 100vw, 2160px"
                        srcSet="
LuxuryDistrict_Map_ymvoxb_c_scale,w_480.png 480w,
LuxuryDistrict_Map_ymvoxb_c_scale,w_1669.png 1669w,
LuxuryDistrict_Map_ymvoxb_c_scale,w_2117.png 2117w,
LuxuryDistrict_Map_ymvoxb_c_scale,w_2136.png 2136w,
LuxuryDistrict_Map_ymvoxb_c_scale,w_2160.png 2160w"
                        src="LuxuryDistrict_Map_ymvoxb_c_scale,w_2160.png"
                        alt={title} />
                </picture>
            </div>
        </section>
    )
}
