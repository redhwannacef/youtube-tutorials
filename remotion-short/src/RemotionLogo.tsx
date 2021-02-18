import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';

const Outer = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
	align-items: center;
	background-color: white;
`;

const Title = styled.div`
	font-size: 210px;
	font-family: 'SF Pro Text', Helvetica, Arial;
	font-weight: 700;
`;

const Container = styled.svg`
	position: absolute;
`;

const Triangle: React.FC<{size: number; opacity: number; scale: number}> = ({
	size,
	opacity,
	scale,
}) => (
	<Container
		width={size}
		height={size}
		style={{opacity, transform: `scale(${scale}) rotate(90deg)`}}
		viewBox="-100 -100 400 400"
	>
		<defs>
			<linearGradient id="gradient">
				<stop stopColor="#42e9f5" stopOpacity={1} offset="0" />
				<stop stopColor="#4290f5" stopOpacity={1} offset="100%" />
			</linearGradient>
		</defs>
		<g stroke="url(#gradient)" strokeWidth="100" strokeLinejoin="round">
			<path
				fill="url(#gradient)"
				d="M 2 172 a 196 100 0 0 0 195 5 A 196 240 0 0 0 100 2.259 A 196 240 0 0 0 2 172 z"
			/>
		</g>
	</Container>
);

const scaleStart = 20;

export const RemotionLogo: React.FC = () => {
	const {fps, width, height} = useVideoConfig();
	const frame = useCurrentFrame();
	const blueOpacity = interpolate(frame, [0, 5], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const scale = (index: number) => {
		const progress = spring({
			fps,
			frame: frame - index * 10 - scaleStart,
			config: {
				damping: 200,
				mass: 0.7,
			},
		});
		return interpolate(progress, [0, 1], [20, 1]);
	};

	const textAnimated = spring({
		fps,
		frame: frame - 65,
		config: {
			damping: 100,
			mass: 2,
			stiffness: 200,
		},
	});

	return (
		<Outer>
			<div
				style={{
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
					transform: `translateY(${interpolate(
						textAnimated,
						[0, 1],
						[100, 300]
					)}px)`,
					opacity: interpolate(textAnimated, [0.5, 1], [0, 1]),
				}}
			>
				<Title>Remotion</Title>
			</div>
			<div
				style={{
					position: 'absolute',
					width,
					height,
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					transform: `translateY(${interpolate(
						textAnimated,
						[0, 1],
						[0, -450]
					)}px)`,
				}}
			>
				<Triangle
					scale={scale(2)}
					size={1100 / 2}
					opacity={blueOpacity * 0.2}
				/>
				<Triangle scale={scale(1)} size={900 / 2} opacity={blueOpacity * 0.4} />
				<Triangle scale={scale(0)} size={700 / 2} opacity={blueOpacity * 1} />
			</div>
		</Outer>
	);
};
