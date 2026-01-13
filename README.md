## License

This project is released under the MIT License.

The MIT License allows anyone to use, modify, and distribute this code for personal or commercial purposes. It is intentionally permissive so the project can be reused, extended, or adapted without legal restrictions.

See the LICENSE file in this repository for full details.

---
# Node.js Authentication Service (JWT + Redis)

A production-ready authentication backend built using Node.js and Express.
Designed for scalable applications, microservices, and real-world production use.

---

## 🚀 Overview

This project provides a secure and extensible authentication system supporting
JWT-based access and refresh tokens, Redis-backed session invalidation,
and role-based access control (RBAC).

It is suitable for SaaS platforms, healthcare systems, fintech apps,
and enterprise-grade backend services.

---

## 🧱 Tech Stack

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- Redis
- MongoDB
- REST APIs

---

## 🔐 Features

- Secure user authentication
- Access & refresh token strategy
- Redis-based token/session invalidation
- Role-based access control (RBAC)
- Modular and scalable architecture
- Production-ready code structure

---

## 🔁 Authentication Flow

1. User logs in with credentials
2. Server issues access & refresh tokens
3. Access token used for API requests
4. Refresh token generates new access token
5. Redis allows instant logout and token revocation

--- 

## ⚙️ Installation & Setup

```bash
git clone https://github.com/ankurjunior/nodejs-auth-service.git
cd nodejs-auth-service
npm install
npm run dev
