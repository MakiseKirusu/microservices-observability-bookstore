from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# IMPORT THE INSTRUMENTATOR
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title='Review Service', version='1.0.0') 

# 1. CORS MIDDLEWARE MUST GO FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# 2. INSTRUMENTATOR GOES AFTER CORS
Instrumentator().instrument(app).expose(app)

class Review(BaseModel):
    review_id: str
    book_id: str
    reviewer: str
    text: str
    date: str


BOOK_REVIEWS = {
    '1': [
        {
            'review_id': 'r1',
            'book_id': '1',
            'reviewer': 'Alice',
            'text': 'A thoughtful, uplifting read.',
            'date': '2025-02-01',
        },
        {
            'review_id': 'r2',
            'book_id': '1',
            'reviewer': 'Minh',
            'text': 'Made me reflect on choices and second chances.',
            'date': '2025-03-12',
        },
    ],
    '2': [
        {
            'review_id': 'r3',
            'book_id': '2',
            'reviewer': 'Jordan',
            'text': 'Clear, practical, and easy to apply.',
            'date': '2025-02-18',
        },
    ],
    '3': [
        {
            'review_id': 'r4',
            'book_id': '3',
            'reviewer': 'Priya',
            'text': 'Fast-paced sci-fi with a big heart.',
            'date': '2025-01-28',
        },
    ],
    '4': [
        {
            'review_id': 'r5',
            'book_id': '4',
            'reviewer': 'Diego',
            'text': 'Epic world-building and unforgettable characters.',
            'date': '2025-02-22',
        },
    ],
    '5': [
        {
            'review_id': 'r6',
            'book_id': '5',
            'reviewer': 'Sofia',
            'text': 'Dense but rewarding—great insights.',
            'date': '2025-03-05',
        },
    ],
    '6': [
        {
            'review_id': 'r7',
            'book_id': '6',
            'reviewer': 'Kenji',
            'text': 'Simple, hopeful, and inspiring.',
            'date': '2025-01-15',
        },
    ],
}


@app.get('/api/reviews/books/{book_id}/reviews', response_model=List[Review])
def list_reviews(book_id: str) -> List[dict]:
    if book_id not in BOOK_REVIEWS:
        raise HTTPException(status_code=404, detail='book not found')
    return BOOK_REVIEWS[book_id]

@app.get('/')
def root_ping() -> dict:
    """Catches the internal ping from the catalog service to keep Kiali green."""
    return {'status': 'review service is awake and listening'}
@app.get('/health')
def health_check() -> dict:
    return {'status': 'ok'}
