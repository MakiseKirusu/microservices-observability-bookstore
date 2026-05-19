
# Review Service

This service provides review data for books.

## Responsibilities

- Return reviews for books
- Support multiple versions for canary demo, such as v1 and v2
- Optionally call the rating service

## Demo purpose

This service is important for:
- canary routing demonstration,
- version-based traffic split,
- service-to-service communication,
- tracing and observability analysis.

## Notes

If versioned deployment is used, document the differences between v1 and v2 clearly.
