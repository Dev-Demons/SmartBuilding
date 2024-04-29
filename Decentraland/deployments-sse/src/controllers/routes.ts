import { Router } from "@well-known-components/http-server"
import { GlobalContext, HandlerContextWithPath } from "../types"
import { pingHandler } from "./handlers/ping-handler"
import { Readable } from "node:stream"

// We return the entire router because it will be easier to test than a whole server
export async function setupRouter(globalContext: GlobalContext): Promise<Router<GlobalContext>> {
  const router = new Router<GlobalContext>()

  router.get("/ping", pingHandler)
  router.get("/sse", async function (ctx: Pick<HandlerContextWithPath<"metrics", "/sse">, "url" | "components">) {
    const stream = new Readable({
      read() {
        // this fn is called every time the readable "needs" a message
      },
      construct() {
        console.log('constructed')
        setInterval(() => this.push(`data: ${JSON.stringify({ now: performance.now() })}\n\n`), 1500)
      },
      destroy() {
        console.log('destroyed')
      }
    })
    
    

    // Tell the client to retry every 10 seconds if connectivity is lost
    stream.push('retry: 10000\n\n');

    return {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      },
      body: stream
    }
  })

  return router
}
