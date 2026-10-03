# Stack-specific backend checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Supabase database access.** Check that serverless or edge code connects through the connection pooler instead of exhausting direct connections, that schema changes live as migrations in the repository and not only as dashboard edits, and that database functions and triggers are reviewed like application code.
- **Firebase data access.** Check queries for unbounded collection reads, listeners left attached after a view closes, multi-document writes without a batch or transaction, and missing composite indexes. Reads are billed per document, so an inefficient query is a cost problem as well as a speed problem.
