import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  // LearnPool was renamed Horizon; keep links already shared working.
  async redirects() {
    return [{ source: '/projects/learnpool', destination: '/projects/horizon', permanent: true }];
  },
};

export default nextConfig;
