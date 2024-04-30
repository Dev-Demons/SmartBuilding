import YouTube from 'react-youtube';
import * as React from 'react'

export const Teaser = () => {

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            controls: 0,
            cc_load_policy: 0,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            disablekb : 1
        },
    };

    return (
        <section id={"teaser"}>
            <YouTube className={'teaser__video'} videoId={'fj5Te3rOxf0'} opts={opts}/>

            <div className={"teaser__poster"}></div>
        </section>
    )

}
