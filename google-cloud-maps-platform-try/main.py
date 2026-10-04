import requests

## Google Maps の API Key
apikey = ""

## 経路検索
res = requests.post(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    headers={
        "X-Goog-Api-Key": apikey,
        # ここで指定したフィールドが返ってくるらしい
        # "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
        "X-Goog-FieldMask": ",".join([
            "routes.duration",
            "routes.distanceMeters",
            "routes.polyline.encodedPolyline",
            "routes.legs.steps.navigationInstruction",
            "routes.legs.steps.distanceMeters",
            "routes.legs.steps.staticDuration",
            "routes.localizedValues",
        ]),
    },
    json={
        "origin": {"address": "海浜幕張駅"},
        "destination": {"address": "幕張メッセ"},
        "travelMode": "WALK",
        "languageCode": "ja",
    },
)
res.raise_for_status()
print(res.json())

route = res.json()["routes"][0]
print("distanceMeters", route["distanceMeters"])
print("duration", route["duration"])


