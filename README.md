## License

This project is released under the MIT License.

The MIT License allows anyone to use, modify, and distribute this code for personal or commercial purposes. It is intentionally permissive so the project can be reused, extended, or adapted without legal restrictions.

See the LICENSE file in this repository for full details.

---

## Code Overview

This repository contains a modular authentication service built with a focus on clean structure, extensibility, and production readiness. The code is organized to keep authentication logic predictable, easy to extend, and safe to maintain over time.

The system is designed around clear separation of responsibilities. Controllers handle HTTP requests, factories decide which implementation to use, builders construct tokens and responses, and middleware manages cross-cutting concerns such as logging.

### Authentication Flow

User authentication is based on JWT tokens. When a user logs in, credentials are validated and a short-lived access token is generated along with a refresh token. Refresh tokens are rotated to limit the impact of token leakage. All token creation is centralized to avoid duplication and inconsistencies.

### Design Approach

The code makes heavy use of factory and builder patterns. Factories are used to resolve authentication strategies and logging behavior at runtime, which makes it easy to add new authentication methods without modifying existing flows. Builders are used to construct tokens and API responses in a controlled and consistent way.

This approach keeps controllers small and avoids conditional logic spread across the codebase.

### Logging and Traceability

Authentication events are logged in a structured manner. Login requests, login results, and token refresh events are handled by dedicated logger modules rather than being mixed with business logic. This separation makes the system easier to audit, debug, and monitor.

### Data Storage Responsibilities

Different data stores are used for different concerns. User identity data is stored in MySQL. Redis is used for session handling and token lifecycle management using TTLs. MongoDB is used to store authentication and event logs. Each store has a clear responsibility and is not overloaded with unrelated data.

### Configuration Management

Configuration is environment-driven and isolated from core logic. Database connections, secrets, and runtime settings are loaded through configuration files, making the service easy to run across development, staging, and production environments.

### Extensibility and Production Use

The codebase is structured so that additional features such as rate limiting, multi-factor authentication, or authorization layers can be added without rewriting core components. The intent is to provide a solid foundation rather than a tightly coupled solution.

---

## Intended Use

This project can be used as a standalone authentication service, a base for application authentication, or a reference implementation for clean backend architecture. It is also suitable as a portfolio project demonstrating real-world authentication design and system structure.
