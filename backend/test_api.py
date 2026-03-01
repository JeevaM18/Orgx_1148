import urllib.request
import json

for ep in ['risk','upcoming','profile','gamification','volatility','forecast']:
    for user in ['user_0', 'user_1', 'user_2']:
        url = f'http://localhost:8000/{ep}/{user}'
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as response:
                print(f'{ep} {user}: {response.status}')
        except Exception as e:
            print(f'{ep} {user}: {e}')
