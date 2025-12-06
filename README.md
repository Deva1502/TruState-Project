# Retail Sales Management System

## Overview
A comprehensive full-stack solution for managing retail sales data. Features advanced server-side search, multi-select filtering, sorting, and pagination. Built to demonstrate clean architecture and professional coding standards.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Responsive Design)
- **Backend**: Node.js, Express.js
- **Data**: In-memory Mock Data Generator (Simulating ~500 records)

## Search Implementation Summary
Implemented server-side full-text search on "Customer Name" and "Phone Number".
- Case-insensitive.
- Debounced on frontend.
- Works in conjunction with all active filters.

## Filter Implementation Summary
Multi-select and Range-based filtering:
- **Multi-select**: Region, Gender, Category, Payment Method, Tags. (Logic: OR within group, AND between groups).
- **Range**: Age (Min/Max), Date (Start/End).
- Dynamic facet generation based on dataset.

## Sorting Implementation Summary
Server-side sorting supporting:
- Date (Newest/Oldest)
- Quantity (High/Low)
- Customer Name (A-Z/Z-A)
- Final Amount (High/Low)
Preserves all active search and filter states.

## Pagination Implementation Summary
Server-side pagination:
- Default page size: 10.
- Returns metadata (`totalPages`, `totalItems`, `currentPage`) for frontend navigation.
- "Next" and "Previous" controls with boundary checks.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- NPM

### 1. Setup Backend
```bash
cd backend
npm install
npm start
```
Server will run on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Application will run on `http://localhost:5173`.
