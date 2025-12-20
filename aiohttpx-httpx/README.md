## aiohttpx vs httpx quick demo

Two tiny scripts you can show on video to contrast httpx and aiohttpx. Both libraries expose sync and async clients; httpx ships them in one package, and aiohttpx mirrors that API on top of aiohttp.

- `aiohttpx_example.py`: uses one `aiohttpx.Client` instance to do both sync (`client.get`) and async (`await client.async_get`) calls inside the same context. Includes a slow-endpoint round so you can see the async lift.
- `httpx_example.py`: same flow with httpx plus a second demo that hits slow `httpbin.org/delay/1` endpoints, making the async speedup obvious.

### How to run

1. Install deps: `uv add httpx aiohttpx` (or `pip install httpx aiohttpx`).
2. Run the aiohttpx comparison: `python aiohttpx_example.py`.
3. Run the httpx comparison (images + delay endpoints): `python httpx_example.py`.

Both scripts write into `downloads/` and print the elapsed seconds so you can call out the async speedup on camera. You'll need internet access for the Unsplash URLs.

Note: `aiohttpx` 0.0.12 expects `ProxiesTypes` from httpx, so we pin `httpx<0.28`. If you already installed 0.28+, reinstall with the pinned version or keep the tiny shim in `aiohttpx_example.py` that adds the alias at runtime.

`aiohttpx` also tries to auto-install `pydantic-settings` at import time; a local `pydantic_settings.py` shim is included so the demo runs in locked-down environments. If you prefer the real package, install it and remove the shim.
