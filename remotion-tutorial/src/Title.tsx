import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Title: React.FC<{text: string}> = ({text}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	return (
		<h1
			style={{
				fontFamily: 'SF Pro Text, Helvetica, Arial',
				fontWeight: 'bold',
				fontSize: 100,
				textAlign: 'center',
				position: 'absolute',
				bottom: 160,
				width: '100%',
			}}
		>
			{text.split(' ').map((t, i) => {
				return (
					<span
						key={t}
						style={{
							color: 'black',
							marginLeft: 10,
							marginRight: 10,
							transform: `scale(${spring({
								fps: videoConfig.fps,
								frame: frame - i * 5,
								config: {
									damping: 100,
									stiffness: 200,
									mass: 0.5,
								},
							})})`,
							display: 'inline-block',
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
