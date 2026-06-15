from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.routing import APIRoute

app = FastAPI(title='Catalog Service', version='1.0.0')

# Safe Debugger: Only prints actual API routes
@app.on_event("startup")
async def startup_event():
    print("--- DEBUG: REGISTERED ROUTES ---")
    for route in app.routes:
        if isinstance(route, APIRoute):
            print(f"Path: {route.path}, Methods: {route.methods}")
    print("---------------------------------")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

class BookSummary(BaseModel):
    id: str
    title: str
    author: str
    price: float
    cover: str


class BookDetail(BookSummary):
    description: str


class CheckoutItem(BaseModel):
    id: str
    title: str
    price: float
    quantity: int


class CheckoutRequest(BaseModel):
    items: List[CheckoutItem]
    total: float
    payment_method: str


class CheckoutResponse(BaseModel):
    order_id: str
    status: str
    message: str


BOOKS = [
    {
        'id': '1',
        'title': 'The Midnight Library',
        'author': 'Matt Haig',
        'price': 24.99,
        'cover': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
        'description': 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    },
    {
        'id': '2',
        'title': 'Atomic Habits',
        'author': 'James Clear',
        'price': 19.95,
        'cover': 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600',
        'description': "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies.",
    },
    {
        'id': '3',
        'title': 'Project Hail Mary',
        'author': 'Andy Weir',
        'price': 22.5,
        'cover': 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=600',
        'description': 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    },
    {
        'id': '4',
        'title': 'Dune',
        'author': 'Frank Herbert',
        'price': 18.0,
        'cover': 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600',
        'description': 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    },
    {
        'id': '5',
        'title': 'Thinking, Fast and Slow',
        'author': 'Daniel Kahneman',
        'price': 21.0,
        'cover': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=600',
        'description': 'The phenomenal New York Times Bestseller by Nobel Prize winner Daniel Kahneman. The book takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    },
    {
        'id': '6',
        'title': 'The Alchemist',
        'author': 'Paulo Coelho',
        'price': 16.99,
        'cover': 'https://images.unsplash.com/photo-1629196914562-671e624eb066?auto=format&fit=crop&q=80&w=600',
        'description': "Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago.",
    },
]


def book_to_summary(book: dict) -> dict:
    return {
        'id': book['id'],
        'title': book['title'],
        'author': book['author'],
        'price': book['price'],
        'cover': book['cover'],
    }

# Registering routes DIRECTLY on 'app' with the full prefix
@app.get('/api/catalog/books', response_model=List[BookSummary])
def list_books() -> List[dict]:
    return [book_to_summary(book) for book in BOOKS]

@app.get('/api/catalog/books/{book_id}', response_model=BookDetail)
def get_book(book_id: str) -> dict:
    for book in BOOKS:
        if book['id'] == book_id:
            return book
    raise HTTPException(status_code=404, detail='book not found')

@app.post('/api/catalog/checkout', response_model=CheckoutResponse)
def checkout(order: CheckoutRequest) -> dict:
    return {
        'order_id': 'ORDER-0001',
        'status': 'success',
        'message': 'order success',
    }

@app.get('/health')
def health_check() -> dict:
    return {'status': 'ok'}