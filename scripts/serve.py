"""Local preview with the same clean URLs Vercel serves: /work -> work.html, unknown paths -> 404.html.

Run from anywhere:  python3 scripts/serve.py [port]
"""
import http.server
import io
import os
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = urllib.parse.unquote(urllib.parse.urlsplit(self.path).path)
        local = os.path.join(ROOT, path.lstrip("/"))
        if path != "/" and not os.path.exists(local):
            if os.path.exists(local + ".html"):
                self.path = path + ".html"
            else:
                with open(os.path.join(ROOT, "404.html"), "rb") as f:
                    body = f.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                return io.BytesIO(body)
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
    print(f"Serving {ROOT} at http://127.0.0.1:{port}")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), CleanURLHandler).serve_forever()
