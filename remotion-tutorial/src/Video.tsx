import {
	Composition,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={30 * 3}
				fps={30}
				width={540}
				height={960}
			/>
		</>
	);
};

const Title = () => (
	<h1
		style={{
			position: 'absolute',
			top: '40%',
			width: '100%',
			textAlign: 'center',
			fontSize: '5rem',
		}}
	>
		Remotion
	</h1>
);
const Subtitle = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = (offset: number) =>
		interpolate(frame - offset * 5, [0, 30], [0, 1]);
	const translate = (offset: number) =>
		spring({frame: frame - offset * 5, fps, to: -100});

	return (
		<h2
			style={{
				position: 'absolute',
				top: '70%',
				width: '100%',
				textAlign: 'center',
				fontSize: '3rem',
			}}
		>
			{'This video was made in react!'.split(' ').map((word, i) => (
				<span
					style={{
						display: 'inline-block',
						marginLeft: 10,
						opacity: opacity(i),
						transform: `translateY(${translate(i)}px)`,
					}}
				>
					{word}
				</span>
			))}
		</h2>
	);
};

const Main = () => {
	const {fps, durationInFrames} = useVideoConfig();
	return (
		<div style={{backgroundColor: 'white', flexGrow: 1}}>
			<Sequence from={0} durationInFrames={durationInFrames}>
				<Title />
			</Sequence>
			<Sequence from={fps} durationInFrames={60}>
				<Subtitle />
			</Sequence>
		</div>
	);
};
