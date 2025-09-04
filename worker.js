import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  try {
    // Try to serve the requested file
    return await getAssetFromKV(event)
  } catch (err) {
    // If it fails (file not found), serve index.html for SPA fallback
    return await getAssetFromKV(event, { mapRequestToAsset: req => new Request('/index.html', req) })
  }
}
