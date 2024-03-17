import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleCanvas= () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);


  const options = useMemo(
      () => ({
        background: {

        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: false, mode: "push" },
            onHover: { enable: false, mode: "repulse" },
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 200, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: .5,
            straight: false,
          },
          number: {
            density: { enable: true },
            value: 80,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
        // particles: {
        //   number: {
        //     value: 30,
        //     density: {
        //       enable: true,
        //       value_area: 800
        //     }
        //   },
        //   color: {
        //     value: "#ffffff"
        //   },
        //   shape: {
        //     type: "circle",
        //     stroke: {
        //       width: 0,
        //       color: "#000000"
        //     },
        //     image: {
        //       src: "img/github.svg",
        //       width: 100,
        //       height: 100
        //     }
        //   },
        //   opacity: {
        //     value: 0.4,
        //     random: true,
        //     anim: {
        //       enable: true,
        //       speed: 1,
        //       opacity_min: 0.1,
        //       sync: false
        //     }
        //   },
        //   size: {
        //     value: 3,
        //     random: true,
        //     anim: {
        //       enable: true,
        //       speed: 2,
        //       size_min: 0.1,
        //       sync: false
        //     }
        //   },
        //   line_linked: {
        //     enable_auto: true,
        //     distance: 100,
        //     color: "#fff",
        //     opacity: 1,
        //     width: 1,
        //     condensed_mode: {
        //       enable: false,
        //       rotateX: 600,
        //       rotateY: 600
        //     }
        //   },
        //   move: {
        //     enable: true,
        //     speed: 1,
        //     direction: "none",
        //     random: false,
        //     straight: false,
        //     out_mode: "out",
        //     bounce: false,
        //     attract: {
        //       enable: false,
        //       rotateX: 600,
        //       rotateY: 1200
        //     }
        //   }
        // },
        // interactivity: {
        //   detect_on: "canvas",
        //   events: {
        //     onhover: {
        //       enable: false
        //     },
        //     onclick: {
        //       enable: false
        //     },
        //     resize: false
        //   }
        // },
        // retina_detect: true
      }),
      [],
  );

  if (init) {
    return (
        <Particles
            id="tsparticles"
            options={options}
        />
    );
  }

  return <></>;
};
export default ParticleCanvas;