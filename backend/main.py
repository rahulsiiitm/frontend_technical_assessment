import os
import asyncio
import httpx
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_is_dag(nodes, edges):
    # 1. Build Adjacency List
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj_list:
            adj_list[source].append(target)
    
    # 2. DFS for Cycle Detection
    visited = set()
    recursion_stack = set()
    
    def dfs(node):
        visited.add(node)
        recursion_stack.add(node)
        
        for neighbor in adj_list.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor):
                    return True # Cycle detected
            elif neighbor in recursion_stack:
                return True # Cycle detected
        
        recursion_stack.remove(node)
        return False

    # 3. Check every node
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if dfs(node_id):
                return False # Cycle found, so NOT a DAG
                
    return True # No cycles found, IS a DAG

# --- NEW: SELF-PING LOGIC FOR RENDER ---
# @app.on_event("startup")
# async def startup_event():
#     # Only run this if we are deployed on Render (checked via environment variable)
#     url = os.getenv("RENDER_EXTERNAL_URL")
#     if url:
#         print(f"🌍 Starting self-ping for {url}")
#         asyncio.create_task(keep_alive(url))

# async def keep_alive(url):
#     """Pings the server every 10 minutes to prevent sleep."""
#     async with httpx.AsyncClient() as client:
#         while True:
#             await asyncio.sleep(600)  # Ping every 10 minutes
#             try:
#                 response = await client.get(url)
#                 print(f"✅ Pinged {url} - Status: {response.status_code}")
#             except Exception as e:
#                 print(f"❌ Ping failed: {e}")