import { createDatabase } from "./fake-snippets-api/lib/db/db-client"
import { defineConfig, Plugin } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import { getNodeHandler } from "winterspec/adapters/node"

// @ts-ignore
import winterspecBundle from "./dist/bundle.js"

const db = createDatabase()

const fakeHandler = getNodeHandler(winterspecBundle as any, {
  middleware: [
    (req, ctx, next) => {
      ;(ctx as any).db = db
      return next(req, ctx)
    },
  ],
})

function apiFakePlugin(): Plugin {
  return {
    name: "api-fake",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/")) {
          // simulate slow responses
          await new Promise((resolve) => setTimeout(resolve, 500))
          fakeHandler(req, res)
        } else {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiFakePlugin()],
  define: {
    global: {},
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:9999",
  //       changeOrigin: true,
  //       configure: (proxy, _options) => {
  //         proxy.on("proxyReq", (proxyReq, req, res) => {
  //           return fakeHandler(req, res)
  //         })
  //       },
  //     },
  //   },
  // },
  build: {
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  logLevel: "info",
})
