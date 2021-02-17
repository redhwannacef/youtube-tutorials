import {
	AbsoluteFill,
	Audio,
	Img,
	interpolate,
	Sequence,
	useCurrentFrame,
} from 'remotion';
import exampleCode from './code-sample.png';
import {ReactLogo} from './Main/ReactLogo';
import {RemotionLogo} from './RemotionLogo';
import {Subscribe} from './Subscribe';
import {Subtitle} from './Subtitle';
import {Title} from './Title';
import {Transition} from './Transition';
import voiceover from './voiceover.wav';

export const Main: React.FC = () => {
	const frame = useCurrentFrame();

	const opacityOut = (endFrame: number) =>
		interpolate(frame, [endFrame - 5, endFrame], [1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});

	const scene1End = 120;
	const scene2End = 240;
	const scene3End = 360;
	const scene4End = 450;

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div>
				<Sequence from={0} durationInFrames={scene1End}>
					<Transition type="out">
						<ReactLogo />
					</Transition>
				</Sequence>
				<Sequence from={25} durationInFrames={scene1End - 25}>
					<Transition type="out">
						<Title text="This video was made with react" />
					</Transition>
				</Sequence>
				<Sequence from={scene1End - 50} durationInFrames={50}>
					<Transition type="out">
						<Subtitle text="🤯" />
					</Transition>
				</Sequence>
			</div>

			<div style={{opacity: opacityOut(scene2End)}}>
				<Sequence
					from={scene1End - 5}
					durationInFrames={scene2End - scene1End + 5}
				>
					<Transition type="in">
						<Img
							style={{width: '100%', padding: 50, paddingTop: 50}}
							src={exampleCode}
						/>
					</Transition>
				</Sequence>
				<Sequence from={scene2End - 40} durationInFrames={40}>
					<Title text="How ?" />
				</Sequence>
			</div>

			<div style={{opacity: opacityOut(scene3End)}}>
				<Sequence from={scene2End} durationInFrames={scene3End - scene2End}>
					<Transition type="in">
						<AbsoluteFill style={{overflow: 'hidden'}}>
							<RemotionLogo />
						</AbsoluteFill>
					</Transition>
				</Sequence>
			</div>

			<div>
				<Sequence from={scene3End} durationInFrames={scene4End - scene3End}>
					<Subscribe />
				</Sequence>
				<Sequence from={scene4End - 60} durationInFrames={60}>
					<Title text="Stay tuned for the tutorial 🚀" />
				</Sequence>
			</div>

			<Audio src={voiceover} />
		</div>
	);
};
