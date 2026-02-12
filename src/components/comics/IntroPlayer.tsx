/**
 * Intro Player - Embeds the BabaruIntro Remotion composition in the web app
 * Uses @remotion/player for in-browser playback
 * @author Steven Lansangan / JC Industries
 */
import { Player } from '@remotion/player'
import { BabaruIntro } from '../../remotion/Intro/BabaruIntro'

interface IntroPlayerProps {
    autoPlay?: boolean
    loop?: boolean
    showControls?: boolean
    style?: React.CSSProperties
    className?: string
}

export default function IntroPlayer({
    autoPlay = true,
    loop = false,
    showControls = true,
    style,
    className,
}: IntroPlayerProps) {
    return (
        <div className={className} style={style}>
            <Player
                component={BabaruIntro}
                compositionWidth={1920}
                compositionHeight={1080}
                durationInFrames={210}
                fps={30}
                autoPlay={autoPlay}
                loop={loop}
                controls={showControls}
                style={{
                    width: '100%',
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            />
        </div>
    )
}
