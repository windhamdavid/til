# OpenAI

After my [most recent experiments](https://davidwindham.com/artificial-intelligence-2/) with OpenAI I'm gonna need a doc for OpenAI references. I'm starting by building personal chatbot assistants for my own todo lists, calendars, and documentation because I can clearly see a useful application for some of my clients who host large amounts of internal and public documentation. Although there will likely be hundreds of service as software projects for this, I'd like to built my own so that I can better understand them. 

### Docs

OpenAI Docs - https://platform.openai.com/docs
OpenAI API Reference - https://platform.openai.com/docs/api-reference 
Plugins - https://platform.openai.com/docs/plugins 

### Videos

- Build Your Own Auto-GPT Apps with LangChain - https://www.youtube.com/watch?v=NYSWn1ipbgg / https://github.com/daveebbelaar/langchain-experiments
- Building a ChatGPT Plugin for Lex Fridman Podcasts - https://www.youtube.com/watch?v=bAQ6VRewf0w
- The LangChain Cookbook - Beginner Guide To 7 Essential Concepts - https://www.youtube.com/watch?v=2xxziIWmaSA&t=1s


### Reference Projects

GPT4 LangChain PDF - https://github.com/mayooear/gpt4-pdf-chatbot-langchain  
LLM trained on 500,000 group chat messages - https://www.izzy.co/blogs/robo-boys.html fork 👉🏼 https://github.com/windhamdavid/gpt4-jenks

Obsidian Vault-Chat - https://github.com/exoascension/vault-chat 

### Reference Lists

https://github.com/humanloop/awesome-chatgpt  



### Learning Courses

ChatGPT Prompt Engineering for Developers - https://learn.deeplearning.ai/chatgpt-prompt-eng/

LangChain Tutorials - https://github.com/gkamradt/langchain-tutorials

### GPT Retrieval Plugin 

ChatGPT Retrieval Plugin - https://github.com/windhamdavid/chatgpt-retrieval-plugin  


```bash
david@ovid🏛 :~/sites/gpt(main○) » poetry env use python3.10
david@ovid🏛 :~/sites/gpt(main○) » python --version
Python 3.10.10
david@(chatgpt-retrieval-plugin-py3.10) david@ovid🏛 :~/sites/gpt(main○) » poetry install
Package operations: 87 installs, 0 updates, 0 removals
Installing packaging (23.0)
  • Installing frozenlist (1.3.3)
  • Installing idna (3.4)
  • Installing marshmallow (3.19.0)
  • Installing multidict (6.0.4)
  • Installing mypy-extensions (1.0.0)
  • Installing pycparser (2.21)
  • Installing sniffio (1.3.0)
  • Installing typing-extensions (4.5.0)
  • Installing aiosignal (1.3.1)
  • Installing anyio (3.6.2)
  • Installing async-timeout (4.0.2)
  • Installing attrs (22.2.0)
  • Installing certifi (2022.12.7)
  • Installing cffi (1.15.1)
  • Installing charset-normalizer (3.1.0)
  • Installing filelock (3.11.0)
  • Installing h11 (0.14.0)
  • Installing hpack (4.0.0)
  • Installing hyperframe (6.0.1)
  • Installing lxml (4.9.2)
  • Installing marshmallow-enum (1.5.1)
  • Installing pycryptodomex (3.17)
  • Installing pydantic (1.10.7)
  • Installing six (1.16.0)
  • Installing typing-inspect (0.8.0)
  • Installing urllib3 (1.26.15)
  • Installing yarl (1.8.2)
  • Installing aiohttp (3.8.4): Downloading... 0%
  • Installing blobfile (2.0.1): Pending...
  • Installing cryptography (40.0.1): Pending...
  • Installing aiohttp (3.8.4)
  • Installing blobfile (2.0.1)
  • Installing cryptography (40.0.1)
  • Installing dataclasses-json (0.5.7)
  • Installing decorator (5.1.1)
  • Installing exceptiongroup (1.1.1)
  • Installing grpcio (1.47.5)
  • Installing h2 (4.1.0)
  • Installing httpcore (0.16.3)
  • Installing iniconfig (2.0.0)
  • Installing numpy (1.24.2)
  • Installing openapi-schema-pydantic (1.2.4)
  • Installing pluggy (1.0.0)
  • Installing protobuf (3.20.3)
  • Installing python-dateutil (2.8.2)
  • Installing pytz (2023.3)
  • Installing regex (2023.3.23)
  • Installing pyyaml (6.0)
  • Installing requests (2.28.2)
  • Installing rfc3986 (1.5.0)
  • Installing sqlalchemy (1.4.47)
  • Installing tenacity (8.2.2)
  • Installing tomli (2.0.1)
  • Installing tqdm (4.65.0)
  • Installing tzdata (2023.3)
  • Installing authlib (1.2.0): Pending...
  • Installing click (8.1.3): Pending...
  • Installing coverage (7.2.3): Pending...
  • Installing dnspython (2.3.0): Pending...
  • Installing authlib (1.2.0)
  • Installing click (8.1.3)
  • Installing coverage (7.2.3)
  • Installing dnspython (2.3.0)
  • Installing grpcio-tools (1.47.5)
  • Installing httpx (0.23.3)
  • Installing langchain (0.0.133)
  • Installing loguru (0.6.0)
  • Installing mmh3 (3.0.0)
  • Installing openai (0.27.5)
  • Installing pandas (2.0.0)
  • Installing pillow (9.5.0)
  • Installing pytest (7.2.2)
  • Installing starlette (0.25.0)
  • Installing tiktoken (0.2.0)
  • Installing ujson (5.4.0)
  • Installing validators (0.19.0)
  • Installing xlsxwriter (3.0.9)
  • Installing arrow (1.2.3): Pending...
  • Installing docx2txt (0.8): Downloading... 0%
  • Installing fastapi (0.92.0): Pending...
  • Installing arrow (1.2.3)
  • Installing docx2txt (0.8)
  • Installing fastapi (0.92.0)
  • Installing llama-index (0.5.4)
  • Installing pinecone-client (2.2.1)
  • Installing pymilvus (2.2.4)
  • Installing pypdf2 (3.0.1)
  • Installing pytest-asyncio (0.20.3)
  • Installing pytest-cov (4.0.0)
  • Installing python-dotenv (0.21.1)
  • Installing python-multipart (0.0.6)
  • Installing python-pptx (0.6.21)
  • Installing qdrant-client (1.1.1)
  • Installing redis (4.5.1)
  • Installing uvicorn (0.20.0)
  • Installing weaviate-client (3.15.4)
Installing the current project: chatgpt-retrieval-plugin (0.1.0)
```

## See Also: 

### Repos

Llama Index - https://gpt-index.readthedocs.io/en/latest/
Llama Index - https://github.com/jerryjliu/llama_index

LangChain - https://python.langchain.com/en/latest/index.html
LangChain repo - https://github.com/hwchase17/langchain