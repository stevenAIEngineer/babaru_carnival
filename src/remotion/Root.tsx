import React from 'react';
import { Composition } from 'remotion';
import { BabaruIntro } from './Intro/BabaruIntro';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="BabaruIntro"
                component={BabaruIntro}
                durationInFrames={240}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    episodeTitle: 'Episode 1',
                }}
            />
            <Composition
                id="BabaruIntroClean"
                component={BabaruIntro}
                durationInFrames={240}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{}}
            />
        </>
    );
};
