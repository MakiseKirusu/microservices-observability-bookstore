
# Rating Service

This service provides rating data for books.

## Responsibilities

- Return numeric ratings
- Support calls from other services, such as the review service
- Help demonstrate service dependency behavior

## Demo purpose

This service can be used to:
- show service-to-service calls,
- introduce delays or failures for resilience testing,
- demonstrate traces, logs, and metrics.

## Notes

This service may include a controllable delay or error endpoint for testing.

## Endpoints

- `GET /books/{id}/rating` - Return rating for a book.
  - Query params: `delay_ms` (0-10000) to simulate latency, `fail=true` to simulate an error.
- `GET /health` - Health check.
