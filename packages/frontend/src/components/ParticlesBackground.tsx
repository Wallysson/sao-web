import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import config from './particlesData';

export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container);
  }, []);
  return (
    <Particles
      id="tsparticles"
      options={config}
      init={particlesInit}
      loaded={particlesLoaded}
      className="fixed inset-0 w-full h-full bg-black"
    />
  );
}
