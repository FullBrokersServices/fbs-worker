# Database Governance Protocol (v1.0.0)

> **Context UUID**: `fe0c47f2-6d64-4510-86a8-1260935e8e2a`
> **Status**: ACTIVE_GOVERNANCE
> **Mission**: Ensure high-fidelity, deterministic database evolution without regressions.

## 🏗️ Schema Governance
1. **Source of Truth**: The files in `pending-to-check/database/` are the authoritative schema definition.
2. **Zero Drift**: Any change to the live database MUST be reflected in a corresponding migration script and updated in the core schema files (`schema.sql`, `views.sql`, etc.).
3. **Naming Consistency**: Follow the established naming conventions (e.g., `salary_min`/`salary_max` instead of ad-hoc `salary_range` columns).

## 🛡️ Security & Isolation
1. **SECURITY INVOKER**: All views MUST be created with `security_invoker = true` to respect Row Level Security (RLS) policies.
2. **Deterministic search_path**: All functions MUST include a `SET search_path = public, pg_catalog` clause to prevent SQL injection and name resolution vulnerabilities (F-021).
3. **Extension Isolation**: All PostgreSQL extensions (e.g., `pg_trgm`, `pg_net`) MUST reside in the `extensions` schema, NOT `public`.
4. **Role-Based Access Control (RBAC)**: Policies must explicitly handle `anon`, `authenticated`, and `service_role` roles. Admin checks must use `public.is_admin()`.

## ⚡ Performance Optimization
1. **Index Discipline**:
   - Foreign keys MUST have covering indexes.
   - Unused or redundant indexes MUST be purged to reduce overhead.
   - Large tables (e.g., `activity_logs`) require specialized index strategies (e.g., `DROP INDEX CONCURRENTLY` in production).
2. **RLS Performance**: Policies should avoid expensive cross-table checks where possible. Use subqueries or security definer wrapper functions sparingly and with audit.

## 📜 Migration Protocol
1. **Idempotency**: All migration scripts MUST be idempotent (using `IF EXISTS`, `IF NOT EXISTS`, `CREATE OR REPLACE`).
2. **Atomic Execution**: Use `BEGIN;` and `COMMIT;` blocks for all migrations.
3. **Audit Trail**: Every migration must be logged in the `active-audit-findings.md` and referenced in the `task.md`.

## 🧪 Verification Gate
- Every database change MUST be verified against the Supabase Lints (Performance & Security).
- No migration is "Complete" until the `Walkthrough` reflects a successful execution and zero regressions in the UI.
