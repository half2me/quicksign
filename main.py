#!/usr/bin/env python3

import os
from aiohttp.web import Application, Request, RouteTableDef, json_response, run_app, FileResponse

import crypto

routes = RouteTableDef()


@routes.get('/')
async def index(request: Request):
    return FileResponse('index.html')


@routes.post('/api/sign')
async def sign(request: Request):
    data = await request.json()
    signature = request.app['crypto'].sign(data['data'])
    return json_response(signature)


app = Application()
app['crypto'] = crypto.Crypto(password=os.getenv('pw'))

app.add_routes(routes)
app.router.add_static('/', path='static', name='static')

run_app(app, host='0.0.0.0', port=os.getenv('port', 80))
