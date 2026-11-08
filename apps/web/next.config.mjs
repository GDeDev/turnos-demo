const API = process.env.API_URL ?? "http://127.0.0.1:4000";

/** @type {import('next').NextConfig} */
export default {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API}/api/:path*` }];
  },
};
