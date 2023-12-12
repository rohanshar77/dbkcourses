
DBK Course Search: AI-Powered Course Search Tool
Overview
DBK Course Search is an innovative, AI-powered search platform for the University of Maryland course catalog. Utilizing advanced machine learning techniques, it offers a highly intuitive and accurate course search experience. The tool vectorizes user input to deliver relevant search results from the comprehensive UMD course database.

Technical Architecture
Frontend: Developed using React, providing a responsive and user-friendly interface.
Backend: Python-Flask, ensuring a robust and scalable server-side application.
AI Processing: Integration of Pinecone databases for efficient handling of vectorized data.
Data Filtering: Specialized filter to segregate undergraduate courses, maintained in a separate Pinecone database.
Installation and Setup
To set up the DBK Course Search platform, follow these steps:

Course Scraper:

Run courses-scraper.py.
This script scrapes all UMD courses and saves them to courses.csv.
Embedding Generation:

Execute embed.py.
It appends an embeddings column to courses.csv and exports the data to Parquet format.
Pinecone Database Upload:

Run pinecone-upload.py.
This uploads all Parquet data to the Pinecone database.
Query Engine and Server Initialization:

With the Pinecone vectors in place, the system is ready for querying through the query engine and server.
Features
AI-Driven Search: Leverages machine learning for accurate and relevant search results.
Undergraduate Course Filter: Easy filtering to display only undergraduate courses.
Intuitive User Interface: React-based frontend for a seamless user experience.
Scalable Backend: Python-Flask backend, capable of handling extensive queries efficiently.
Contributions and Support
