import * as React from 'react';
import "./marquee.scss";
export const Marquee = (props) => {

    return (
        <div className='marquee'>
            <div>{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}</div>
            <div>{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}</div>
            <div>{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}{props.children}</div>
        </div>
    )

}
