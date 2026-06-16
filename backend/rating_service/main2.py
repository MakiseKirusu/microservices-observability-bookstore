import time
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title='Rating Service', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)


class RatingResponse(BaseModel):
    book_id: str
    rating: float


BOOK_RATINGS = {
    '1': 4.6,
    '2': 4.8,
    '3': 4.7,
    '4': 4.5,
    '5': 4.4,
    '6': 4.3,
}


@app.get('/api/ratings/books/{book_id}/rating', response_model=RatingResponse)
def get_rating(
    book_id: str,
    delay_ms: Optional[int] = Query(default=None, ge=0, le=10000),
    fail: bool = False,
) -> dict:
    if book_id not in BOOK_RATINGS:
        raise HTTPException(status_code=404, detail='book not found')
    if delay_ms:
        time.sleep(delay_ms / 1000)
    if fail:
        raise HTTPException(status_code=503, detail='rating service failure')
    return {'book_id': book_id, 'rating': BOOK_RATINGS[book_id]}

@app.get('/')
def root_ping() -> dict:
    """Catches the internal ping from the catalog service to keep Kiali green."""
    return {'status': 'rating service is awake and listening'}

@app.get('/health')
def health_check() -> dict:
    return {'status': 'ok'}
