# RAG

(26/02/18) Although I still primarily use the Lunr XML search feature, I occasionally use the AI helper and I want to get rid of the remote API calls. I'm adding this page for documenting the process. 

## Overview
Build a fully local RAG system that ingests ~313 markdown files from the Docusaurus site, stores them in ChromaDB with Ollama embeddings, and provides a web UI for semantic search and Q&A.

## Stack
- Python 3 with FastAPI for the web server
- Ollama with nomic-embed-text for embeddings
- ChromaDB for vector storage (persisted to disk)
- Simple HTML/JS frontend served by FastAPI

## Directory Structure

```sh
daw_til/
└── rag/
    ├── ingest.py          # Markdown parser + ChromaDB ingestion
    ├── server.py          # FastAPI web server + query endpoint
    ├── requirements.txt   # Python dependencies
    ├── templates/
    │   └── index.html     # Web UI (search box + results)
    └── chroma_db/         # ChromaDB persistence (gitignored)
```

## Implementation Steps
1. Create rag/requirements.txt
```sh
chromadb
fastapi
uvicorn[standard]
ollama
python-frontmatter
```

2. Create ```rag/ingest.py``` — Markdown Ingestion Pipeline
- Walk docs/, notes/, lists/, posts/ directories
- Parse each .md file:
  - Extract YAML frontmatter (posts have title, slug, description, tags)
  - For docs/notes/lists: derive title from first # heading
  - Extract date from post filenames (YYYY-MM-DD pattern)
  - Categorize by directory: docs, notes, lists, posts
- Chunking strategy:
  - Split on markdown headers (##, ###) to keep semantic sections intact
  - For sections exceeding ~1000 chars, further split on paragraphs
  - Each chunk gets metadata: source (file path), category, section (header path), title, tags (if post)
- Generate embeddings via Ollama (nomic-embed-text)
- Upsert into ChromaDB collection with metadata
- Print progress (file count, chunk count, timing)
3. Create ```rag/server.py``` — FastAPI Query Server
- ```GET /``` — serve the HTML UI
- ```POST /query``` — accept a search query, embed it with Ollama, query ChromaDB for top-k results (default 8), return JSON with chunks + metadata + distances
- ```GET /stats``` — return collection stats (doc count, chunk count)
- CORS enabled for local dev
4. Create ```rag/templates/index.html``` — Web UI
- Clean, minimal search interface
- Search box with submit button
- Results displayed as cards showing:
  - Matched text snippet
  - Source file path (clickable link to Docusaurus page)
  - Category badge (docs/notes/lists/posts)
  - Relevance score
- Loading spinner during search
5. Add ```rag/``` to ```.gitignore```
Add ```rag/chroma_db/``` to gitignore to keep vector data out of git

## Metadata Schema (ChromaDB)
Each chunk stored with:
```js
{
    "source": "docs/lang/JavaScript.md",  # relative file path
    "category": "docs",                    # docs|notes|lists|posts
    "title": "JavaScript",                 # doc/post title
    "section": "Arrays > Map and Filter",  # header breadcrumb
    "tags": "tech",                        # comma-separated (posts only)
    "date": "2025-03-03",                  # posts only
    "url": "/til/docs/lang/JavaScript"     # reconstructed Docusaurus URL
}
```

## Prerequisites
- Ollama installed and running with nomic-embed-text model pulled
- Python 3.10+

## Usage
```sh
cd rag
pip install -r requirements.txt
ollama pull nomic-embed-text

# Ingest all markdown files (run once, re-run to rebuild)
python ingest.py

# Start the web UI
python server.py
# Open http://localhost:8808
```

## Verification
1. Run ```python ingest.py``` — should report ~300+ files processed and ~1000+ chunks created
2. Run ```python server.py``` — should start on port 8808
3. Open browser to ```http://localhost:8808```
4. Search for "PostgreSQL" — should return relevant chunks from ```docs/db/PostgreSQL.md```
5. Search for "Docker" — should return chunks from docs/server/Docker.md
6. Search for a conceptual query like "how to set up SSL certificates" — should return relevant Let's Encrypt / Apache / Nginx docs