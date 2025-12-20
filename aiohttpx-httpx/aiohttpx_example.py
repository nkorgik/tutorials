import asyncio
import time
from pathlib import Path

import httpx

# Compatibility shim: aiohttpx<=0.0.12 expects httpx._types.ProxiesTypes (renamed in httpx 0.28).
if not hasattr(httpx._types, "ProxiesTypes"):
    httpx._types.ProxiesTypes = httpx._types.ProxyTypes

import aiohttpx

IMAGE_URLS = [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
]
LATENCY_URLS = ["https://httpbin.org/delay/1"] * 8

OUTPUT_DIR = Path("downloads/aiohttpx")
CLIENT_OPTS = dict(follow_redirects=True, headers={"Accept": "image/jpeg"})


async def fetch_image_async(
    client: aiohttpx.Client, url: str, index: int, prefix: str
) -> Path:
    response = await client.async_get(url, timeout=30.0)
    response.raise_for_status()
    path = OUTPUT_DIR / f"{prefix}_{index}.jpg"
    path.write_bytes(response.content)
    return path


async def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print("--- single aiohttpx.Client demo (sync + async in one) ---")

    async with aiohttpx.Client(**CLIENT_OPTS) as client:
        # Sync calls via the same client
        started = time.perf_counter()
        for index, url in enumerate(IMAGE_URLS, 1):
            response = client.get(url, timeout=30.0)
            response.raise_for_status()
            path = OUTPUT_DIR / f"sync_image_{index}.jpg"
            path.write_bytes(response.content)
        elapsed = time.perf_counter() - started
        print(f"sync (client.get) downloaded {len(IMAGE_URLS)} images in {elapsed:.2f}s")

        # Async calls via the same client
        started = time.perf_counter()
        results = await asyncio.gather(
            *(fetch_image_async(client, url, index, "async_image") for index, url in enumerate(IMAGE_URLS, 1))
        )
        elapsed = time.perf_counter() - started
        print(f"async (client.async_get) downloaded {len(results)} images in {elapsed:.2f}s")

        # Forced latency to highlight concurrency
        print("\n--- forced latency demo (same client) ---")
        started = time.perf_counter()
        for url in LATENCY_URLS:
            resp = client.get(url, timeout=10.0)
            resp.raise_for_status()
        elapsed = time.perf_counter() - started
        print(f"sync (client.get) finished {len(LATENCY_URLS)} delay calls in {elapsed:.2f}s")

        started = time.perf_counter()
        await asyncio.gather(*(client.async_get(url, timeout=10.0) for url in LATENCY_URLS))
        elapsed = time.perf_counter() - started
        print(f"async (client.async_get) finished {len(LATENCY_URLS)} delay calls in {elapsed:.2f}s")


if __name__ == "__main__":
    asyncio.run(main())
