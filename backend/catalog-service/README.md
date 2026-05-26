
# Catalog Service

This service provides book catalog data for the Online Bookstore project.

## Responsibilities

- Return book list data
- Return book details
- Provide sample book information for frontend display

## Example responsibilities in the demo

- Serve as a backend service called by the frontend
- Participate in observability dashboards and metrics collection

## Notes

This service should be simple, stable, and easy to test.

## Endpoints

- `GET /books` - Return a list of book summaries (no description field).
- `GET /books/{id}` - Return full book details including description.
- `POST /checkout` - Mock checkout endpoint that returns a success response.
- `GET /health` - Health check.
