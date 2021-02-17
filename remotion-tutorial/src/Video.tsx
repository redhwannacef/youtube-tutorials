import {Composition} from 'remotion';
import {Main} from './Main';

export const Video: React.FC = () => (
	<>
		<Composition
			id="Main"
			component={Main}
			durationInFrames={450}
			fps={30}
			width={1080}
			height={1920}
		/>
	</>
);
