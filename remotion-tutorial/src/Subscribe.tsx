import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';

const Container = styled.span`
	background-color: #c00;
	border-radius: 4px;
	padding: 50px 80px;
	color: #fff;
`;

export const Subscribe: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				fontFamily: 'Helvetica, Arial',
				fontSize: 140,
				textAlign: 'center',
				position: 'absolute',
				bottom: 960,
				width: '100%',
				padding: 10,
				transform: `scale(${scale})`,
			}}
		>
			<Container>
				{['S', 'U', 'B', 'S', 'C', 'R', 'I', 'B', 'E'].map((t, i) => (
					<div
						key={i}
						style={{
							display: 'inline-block',
							transform: `scale(${spring({
								fps,
								frame: frame - i * 2,
								config: {
									damping: 100,
									stiffness: 200,
									mass: 0.5,
								},
							})})`,
						}}
					>
						{t}
					</div>
				))}
			</Container>
		</div>
	);
};
