export const getPlanetStyle = (name: string) => {
  switch (name) {
    case 'Mercury':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(0,0,0,0.4) 0%, transparent 60%),
          radial-gradient(circle at 30% 30%, #a5a5a5, #5e5e5e 70%, #2e2e2e 100%)
        `,
        boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.9), 0 0 20px rgba(165,165,165,0.2)',
      };
    case 'Venus':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 40%),
          radial-gradient(circle at 60% 60%, rgba(164,122,68,0.4) 0%, transparent 50%),
          radial-gradient(circle at 30% 30%, #f9f3d1, #e3bb76 60%, #a47a44 100%)
        `,
        boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.8), 0 0 30px rgba(227,187,118,0.3)',
      };
    case 'Earth':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
          radial-gradient(circle at 70% 60%, #2d5a27 0%, transparent 30%),
          radial-gradient(circle at 40% 40%, #2d5a27 0%, transparent 40%),
          radial-gradient(circle at 55% 35%, #3a7a32 0%, transparent 25%),
          #2b5a8c`,
        boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.8), 0 0 40px rgba(43,90,140,0.5)',
      };
    case 'Mars':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%),
          radial-gradient(circle at 75% 75%, rgba(0,0,0,0.5) 0%, transparent 60%),
          radial-gradient(circle at 30% 30%, #e27b58, #8e3214 70%, #4a1a0a 100%)
        `,
        boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.9), 0 0 30px rgba(226,123,88,0.4)',
      };
    case 'Jupiter':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
          repeating-linear-gradient(
            to bottom,
            #d39c7e 0%, #d39c7e 8%,
            #b07d62 10%, #b07d62 12%,
            #90614d 15%, #90614d 25%,
            #c88b65 30%, #c88b65 40%,
            #794a34 45%, #794a34 55%,
            #ac7e68 60%, #ac7e68 75%,
            #5d3a24 80%, #5d3a24 100%
          )`,
        boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.8), 0 0 50px rgba(211,156,126,0.3)',
      };
    case 'Saturn':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%),
          repeating-linear-gradient(
            to bottom,
            #e4d3a2 0%, #e4d3a2 15%,
            #d4c392 18%, #d4c392 20%,
            #c5a367 25%, #c5a367 45%,
            #e4d3a2 50%, #e4d3a2 70%,
            #9b7e4a 75%, #9b7e4a 100%
          )`,
        boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.7), 0 0 40px rgba(228,211,162,0.3)',
      };
    case 'Uranus':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
          radial-gradient(circle at 30% 30%, #d1f3f9, #76c1e3 70%, #4489a4 100%)
        `,
        boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.6), 0 0 40px rgba(118,193,227,0.4)',
      };
    case 'Neptune':
      return {
        background: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
          radial-gradient(circle at 30% 30%, #4b70db, #2b3e8c 70%, #1a235a 100%)
        `,
        boxShadow: 'inset -15px -15px 40px rgba(0,0,0,0.8), 0 0 40px rgba(43,62,140,0.5)',
      };
    default:
      return { background: 'white' };
  }
};
