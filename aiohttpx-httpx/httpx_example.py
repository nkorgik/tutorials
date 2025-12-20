import asyncio
import time
from pathlib import Path

import httpx

IMAGE_URLS = [
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
]
LATENCY_URLS = ["https://httpbin.org/delay/1"] * 8

OUTPUT_DIR = Path("downloads/httpx")


def download_sync() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    started = time.perf_counter()

    with httpx.Client(follow_redirects=True, headers={"Accept": "image/jpeg"}) as client:
        for index, url in enumerate(IMAGE_URLS, 1):
            response = client.get(url, timeout=30.0)
            response.raise_for_status()
            path = OUTPUT_DIR / f"sync_image_{index}.jpg"
            path.write_bytes(response.content)

    elapsed = time.perf_counter() - started
    print(f"httpx sync downloaded {len(IMAGE_URLS)} images in {elapsed:.2f}s")


async def fetch_image_async(client: httpx.AsyncClient, url: str, index: int) -> Path:
    response = await client.get(url, timeout=30.0)
    response.raise_for_status()
    path = OUTPUT_DIR / f"async_image_{index}.jpg"
    path.write_bytes(response.content)
    return path


async def download_async() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    started = time.perf_counter()

    async with httpx.AsyncClient(
        follow_redirects=True, headers={"Accept": "image/jpeg"}
    ) as client:
        results = await asyncio.gather(
            *(fetch_image_async(client, url, index) for index, url in enumerate(IMAGE_URLS, 1))
        )

    elapsed = time.perf_counter() - started
    print(f"httpx async downloaded {len(results)} images in {elapsed:.2f}s")


def latency_sync() -> None:
    started = time.perf_counter()
    with httpx.Client() as client:
        for url in LATENCY_URLS:
            response = client.get(url, timeout=10.0)
            response.raise_for_status()
    elapsed = time.perf_counter() - started
    print(f"httpx sync (delay endpoints) finished {len(LATENCY_URLS)} requests in {elapsed:.2f}s")


async def latency_async() -> None:
    started = time.perf_counter()
    async with httpx.AsyncClient() as client:
        await asyncio.gather(
            *(client.get(url, timeout=10.0) for url in LATENCY_URLS)
        )
    elapsed = time.perf_counter() - started
    print(f"httpx async (delay endpoints) finished {len(LATENCY_URLS)} requests in {elapsed:.2f}s")


def main() -> None:
    print("--- image download demo ---")
    download_sync()
    asyncio.run(download_async())
    print("\n--- forced latency demo (shows async concurrency) ---")
    latency_sync()
    asyncio.run(latency_async())


if __name__ == "__main__":
    main()
