import os
from aiohttp.web import Application, Request, RouteTableDef, json_response, run_app

import crypto

routes = RouteTableDef()


@routes.post('/api/sign')
async def sign(request: Request):
    data = await request.json()
    signature = request.app['crypto'].sign(data['data'])
    return json_response(signature)


app = Application()
app['crypto'] = crypto.Crypto(password=os.getenv('pw'))
app.add_routes(routes)

run_app(app, host='0.0.0.0', port=8080)
