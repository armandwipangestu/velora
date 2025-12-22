import type { NextConfig } from "next";

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
const isCI = process.env.CI === 'true'

if (!isCI && !process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  import('velite').then(m => m.build({ watch: isDev, clean: !isDev }))
}

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone"
};

export default nextConfig;
