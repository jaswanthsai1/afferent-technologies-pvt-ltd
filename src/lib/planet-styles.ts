export const planetTextures: Record<string, string> = {
  Mercury: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
  Venus: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg',
  Earth: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Africa_and_Europe_from_a_Million_Miles_Away.png/600px-Africa_and_Europe_from_a_Million_Miles_Away.png',
  Mars: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
  Jupiter: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
  Saturn: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
  Uranus: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
  Neptune: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
};

interface PlanetStyle {
  background: string;
  backgroundSize: string;
  backgroundPosition: string;
  boxShadow: string;
}

export const getPlanetStyle = (name: string) => {
  const texture = planetTextures[name];

  const baseStyles: Record<string, PlanetStyle> = {
    Mercury: {
      background: `
        url(${texture}),
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(0,0,0,0.6) 0%, transparent 60%),
        linear-gradient(135deg, #8c8c8c 0%, #5a5a5a 50%, #3d3d3d 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -30px -30px 60px rgba(0,0,0,0.9),
        inset 20px 20px 40px rgba(255,255,255,0.05),
        0 0 60px rgba(140,140,140,0.3),
        0 0 120px rgba(100,100,100,0.15)
      `,
    },
    Venus: {
      background: `
        url(${texture}),
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(255,200,100,0.3) 0%, transparent 70%),
        linear-gradient(135deg, #f5e6c8 0%, #d4a856 50%, #8b6914 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -25px -25px 50px rgba(0,0,0,0.8),
        inset 15px 15px 30px rgba(255,230,180,0.1),
        0 0 80px rgba(212,168,86,0.4),
        0 0 150px rgba(255,200,100,0.2)
      `,
    },
    Earth: {
      background: `
        url(${texture}),
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.25) 0%, transparent 50%),
        radial-gradient(circle at 60% 40%, rgba(100,200,255,0.2) 0%, transparent 40%),
        linear-gradient(135deg, #4a90c2 0%, #2d5a27 30%, #1e3a5f 70%, #0d1f3c 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -30px -30px 60px rgba(0,0,0,0.85),
        inset 20px 20px 40px rgba(100,180,255,0.1),
        0 0 100px rgba(74,144,194,0.5),
        0 0 200px rgba(45,90,39,0.3),
        0 0 300px rgba(100,180,255,0.15)
      `,
    },
    Mars: {
      background: `
        url(${texture}),
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
        radial-gradient(circle at 70% 60%, rgba(0,0,0,0.4) 0%, transparent 50%),
        linear-gradient(135deg, #e27b58 0%, #c1440e 50%, #6b2408 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -25px -25px 50px rgba(0,0,0,0.9),
        inset 15px 15px 30px rgba(255,150,100,0.08),
        0 0 80px rgba(226,123,88,0.5),
        0 0 160px rgba(193,68,14,0.3)
      `,
    },
    Jupiter: {
      background: `
        url(${texture}),
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.12) 0%, transparent 50%),
        repeating-linear-gradient(
          0deg,
          transparent 0%,
          rgba(255,200,150,0.1) 2%,
          rgba(180,120,80,0.15) 4%,
          transparent 6%
        ),
        linear-gradient(135deg, #d4a574 0%, #c88b5c 30%, #8b5a3c 60%, #5c3a28 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -35px -35px 70px rgba(0,0,0,0.85),
        inset 25px 25px 50px rgba(255,200,150,0.08),
        0 0 100px rgba(212,165,116,0.4),
        0 0 200px rgba(200,139,92,0.25)
      `,
    },
    Saturn: {
      background: `
        url(${texture}),
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
        repeating-linear-gradient(
          0deg,
          transparent 0%,
          rgba(255,230,180,0.08) 3%,
          rgba(200,180,140,0.1) 6%,
          transparent 9%
        ),
        linear-gradient(135deg, #f4e4c1 0%, #d4c4a1 30%, #c4a471 60%, #8b7441 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -30px -30px 60px rgba(0,0,0,0.8),
        inset 20px 20px 40px rgba(255,240,200,0.08),
        0 0 80px rgba(244,228,193,0.4),
        0 0 160px rgba(196,164,113,0.25)
      `,
    },
    Uranus: {
      background: `
        url(${texture}),
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(100,220,255,0.2) 0%, transparent 60%),
        linear-gradient(135deg, #b5e8ed 0%, #7dcfdc 30%, #4fb8c9 60%, #2a8a9a 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -25px -25px 50px rgba(0,0,0,0.7),
        inset 15px 15px 30px rgba(180,240,255,0.15),
        0 0 100px rgba(125,207,220,0.5),
        0 0 200px rgba(79,184,201,0.3)
      `,
    },
    Neptune: {
      background: `
        url(${texture}),
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(50,100,200,0.3) 0%, transparent 50%),
        linear-gradient(135deg, #5b8bd4 0%, #3a6cb8 30%, #2850a0 60%, #1a3470 100%)
      `,
      backgroundSize: 'cover, 100% 100%, 100% 100%, 100% 100%',
      backgroundPosition: 'center',
      boxShadow: `
        inset -30px -30px 60px rgba(0,0,0,0.85),
        inset 20px 20px 40px rgba(100,150,255,0.1),
        0 0 100px rgba(91,139,212,0.5),
        0 0 200px rgba(58,108,184,0.3)
      `,
    },
  };

  return baseStyles[name] || {
    background: 'linear-gradient(135deg, #666 0%, #333 100%)',
    boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.8)',
  };
};

interface AtmosphereStyle {
  color: string;
  spread: number;
  blur: number;
}

export const getAtmosphereStyle = (name: string) => {
  const atmospheres: Record<string, AtmosphereStyle> = {
    Earth: {
      color: 'rgba(100, 180, 255, 0.4)',
      spread: 25,
      blur: 30,
    },
    Venus: {
      color: 'rgba(255, 200, 100, 0.35)',
      spread: 30,
      blur: 40,
    },
    Mars: {
      color: 'rgba(255, 150, 100, 0.25)',
      spread: 15,
      blur: 20,
    },
    Jupiter: {
      color: 'rgba(255, 200, 150, 0.2)',
      spread: 20,
      blur: 25,
    },
    Saturn: {
      color: 'rgba(255, 230, 180, 0.2)',
      spread: 20,
      blur: 25,
    },
    Uranus: {
      color: 'rgba(100, 220, 255, 0.35)',
      spread: 25,
      blur: 35,
    },
    Neptune: {
      color: 'rgba(80, 120, 255, 0.35)',
      spread: 25,
      blur: 35,
    },
    Mercury: {
      color: 'rgba(180, 180, 180, 0.15)',
      spread: 10,
      blur: 15,
    },
  };

  return atmospheres[name] || { color: 'rgba(255,255,255,0.1)', spread: 10, blur: 15 };
};

export const getRingStyle = (name: string) => {
  if (name !== 'Saturn' && name !== 'Uranus') return null;

  if (name === 'Saturn') {
    return {
      rings: [
        { width: 260, height: 50, opacity: 0.6, color: '#e4d3a2', borderWidth: 25 },
        { width: 220, height: 42, opacity: 0.4, color: '#c5a367', borderWidth: 12 },
        { width: 190, height: 36, opacity: 0.3, color: '#d4c392', borderWidth: 6 },
      ],
      tilt: -20,
      gap: '#00000066',
    };
  }

  if (name === 'Uranus') {
    return {
      rings: [
        { width: 200, height: 200, opacity: 0.3, color: '#7dcfdc', borderWidth: 8 },
        { width: 180, height: 180, opacity: 0.2, color: '#4fb8c9', borderWidth: 4 },
      ],
      tilt: 90,
      gap: 'transparent',
    };
  }

  return null;
};
