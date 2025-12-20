import httpx


def main():
    print("Hello from aiohttpx-httpx!")
    response = httpx.get("https://httpbin.org/json", timeout=10)
    print(response.json())
    print(response.status_code)
    print(response.headers)
    print(type(response))
    print(type(response.json()))


if __name__ == "__main__":
    main()
