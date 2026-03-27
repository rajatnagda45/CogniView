# 🚀 Cogniview (AI-Powered SaaS Analytics Dashboard)

A modern, production-ready analytics dashboard built to simulate a real-world SaaS product with real-time data, advanced analytics, and AI-driven insights.

Built using **React, Tailwind CSS, Supabase (PostgreSQL + Auth + Realtime)** — Cogniview provides a complete business intelligence experience including order management, customer analytics, inventory tracking, and AI-powered insights.

---

## 🔗 Quick Links
Overview · Features · Screenshots · Tech Stack · Architecture · Setup · Database · Roadmap

---

# 📊 Overview

Cogniview is a full-stack SaaS analytics platform designed to help businesses monitor, analyze, and optimize their operations.

It provides:
- Real-time dashboards
- Order & inventory management
- Customer analytics (CRM)
- AI-powered business insights
- Multi-tenant architecture using Supabase

The goal of this project is to demonstrate **industry-level full-stack skills** with scalable architecture and production-ready features.

---

# ⚡ Features

## 📈 Dashboard & Analytics
- KPI cards (Revenue, Orders, AOV, Repeat Customers)
- Revenue trends (line charts)
- Sales by category (donut charts)
- Activity tracking (last 7 days)

## 🛒 Order Management
- View all orders with status (Processing, Delivered, Cancelled)
- Search, filter, and sort orders
- Order details & tracking system
- Payment method tracking

## 👥 Customer Analytics (CRM)
- Customer segmentation (New vs Returning)
- Customer Lifetime Value (CLV)
- Top customers leaderboard
- Customer growth insights

## 📦 Product & Inventory
- Product performance tracking
- Inventory management (stock levels)
- Low stock alerts
- Category-wise analytics

## 📡 Live Activity Feed
- Real-time updates (orders, payments, alerts)
- Timeline-based UI
- Auto-refresh data using Supabase Realtime

## 📊 Report Builder
- Drag-and-drop report system (UI ready)
- Custom analytics widgets
- Export reports (PDF/CSV - extendable)

## 🧠 AI Insights (High-Demand Feature 🔥)
- “Revenue increased by X%”
- “Top performing product”
- “Best performing city”
- Smart alerts & predictions (extendable)

## ⚙️ Settings & Profile
- Profile management
- Theme-ready UI (dark mode optimized)
- Scalable settings architecture

---

# 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts (data visualization)
- Framer Motion (animations)

### Backend / Database
- Supabase (PostgreSQL)
- Supabase Auth (JWT-based)
- Supabase Realtime

### Tools
- Git & GitHub
- Vercel (deployment)
- CSV data seeding

---

# 🧠 Architecture

## High-Level Flow

Frontend (React Dashboard)
        ↓
Supabase Client (API layer)
        ↓
PostgreSQL Database (Tables & Relations)
        ↓
Realtime Subscriptions (Live updates)

---

## Database Design

Core Tables:
- organizations
- categories
- products
- customers
- orders
- order_items
- payments

Relationships:
- orders → customers
- orders → order_items → products
- products → categories
- all tables → organization (multi-tenant)

---

# ⚙️ Setup Instructions

## 1. Clone Repository
