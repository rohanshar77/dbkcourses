import asyncio
import os, logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from queryengine import query_response, create_context_pinecone

# For task scheduling
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

# Enforce TLS Cert
from flask_talisman import Talisman

app = Flask(__name__, static_folder='frontend/build/', static_url_path='')
CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/searchfast', methods=['POST', 'GET'])
async def searchfast():
    search_term = request.args.get('q', '')
    results = await create_context_pinecone(search_term)

    return jsonify(results)


@app.route('/search', methods=['POST', 'GET'])
async def search():
    if request.method == 'POST':
        data = request.get_json()
        search_term = data.get('q', '')
        context = data.get('context', '')
    else:
        search_term = request.args.get('q', '')
        context = request.args.get('context', '')
    print('Smart Search!')
    results = await query_response(search_term, context=context)

    return jsonify(results)


# Ping pinecone every 24 hours using scheduler to prevent index from getting deleted
async def ping_pinecone():
    results = await create_context_pinecone("testing", False)
    results = await create_context_pinecone("testing", True)
    print("Pinged Pinecone!", results)


def run_pinecone():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(ping_pinecone())


scheduler = BackgroundScheduler()
scheduler.add_job(func=run_pinecone, trigger="interval", days=1)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

# Wrap app in Talisman to enforce TLS cert
Talisman(app, content_security_policy=None)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
