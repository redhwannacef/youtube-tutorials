import {interpolate, useCurrentFrame} from 'remotion';

export const Subtitle: React.FC<{text: string}> = ({text}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	return (
		<div
			style={{
				fontFamily: 'Helvetica, Arial',
				fontSize: 60,
				textAlign: 'center',
				position: 'absolute',
				bottom: 100,
				width: '100%',
				opacity,
			}}
		>
			{text}
		</div>
	);
};
