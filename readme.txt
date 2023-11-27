To process files, follow these steps:

1. Run courses-scraper.py. This will save all UMD courses to courses.csv
2. Run embed.py. This will append an embeddings column to courses.csv and also export to parquet. 
3. Run pinecone-upload.py. This will upload all of the parquet data to pinecone. 
4. The pinecone vectors are now ready to be accessed by queryengine and the server. 