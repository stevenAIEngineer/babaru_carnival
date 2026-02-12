/**
 * Remotion Root - Entry point for all compositions
 * @author Steven Lansangan / JC Industries
 */
import { Composition } from 'remotion'
import { BabaruIntro } from './Intro/BabaruIntro'

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="BabaruIntro"
                component={BabaruIntro}
                durationInFrames={210}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    )
}
