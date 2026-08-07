# Inventory Management API

Backend Inventory Management API untuk mengelola kategori, produk, stok produk, dan riwayat pergerakan stok.

Project ini dibuat menggunakan Node.js Native HTTP Module tanpa menggunakan framework backend seperti Express.js.

## Fitur

### Category Management

- Menambahkan kategori
- Melihat seluruh kategori
- Melihat kategori berdasarkan ID
- Mengubah kategori berdasarkan ID
- Menghapus kategori berdasarkan ID

### Product Management

- Menambahkan produk
- Melihat seluruh produk
- Melihat produk berdasarkan ID
- Mengubah produk berdasarkan ID
- Menghapus produk berdasarkan ID

### Stock Management

- Menambahkan stok masuk (`IN`)
- Mengurangi stok melalui stok keluar (`OUT`)
- Melihat stok produk berdasarkan ID
- Melihat riwayat pergerakan stok berdasarkan produk

## Database & Relasi

Project ini menggunakan PostgreSQL sebagai database relasional.

Relasi utama pada database:

```text
kategori
    │
    │ 1
    │
    │ N
    ▼
 produk
    │
    │ 1
    │
    │ N
    ▼
riwayat_stok
```

- Satu kategori dapat memiliki banyak produk.
- Satu produk dapat memiliki banyak riwayat stok.
- Setiap riwayat stok terhubung dengan satu produk melalui foreign key `produk_id`.

## Stock Transaction

Proses Stock In dan Stock Out menggunakan PostgreSQL Transaction untuk menjaga konsistensi data.

Contoh proses Stock In:

```text
START TRANSACTION
        ↓
Validasi Produk
        ↓
Update Stok Produk
        ↓
Insert Riwayat Stok
        ↓
COMMIT
```

Jika terjadi error pada salah satu proses:

```text
START TRANSACTION
        ↓
Update Stok Produk
        ↓
Insert Riwayat Stok
        ↓
ERROR
        ↓
ROLLBACK
```

Dengan transaction, perubahan stok dan pencatatan riwayat stok dapat diproses sebagai satu kesatuan.

## Tech Stack

- Node.js v24
- JavaScript (ES Modules)
- Native HTTP Module (`node:http`)
- PostgreSQL

## Libraries

- `pg` — Menghubungkan aplikasi Node.js dengan database PostgreSQL
- `dotenv` — Mengelola environment variable

## Development & Testing Tools

- PostgreSQL — Menjalankan database pada lingkungan development lokal
- Postman — Melakukan pengujian endpoint API
- `nodemon` — Menjalankan ulang server secara otomatis ketika terjadi perubahan code

## Instalasi & Konfigurasi

### Prasyarat

Pastikan perangkat telah terinstal:

- Node.js v24
- npm
- PostgreSQL
- Postman

> Project ini dikembangkan dan diuji menggunakan Node.js v24 serta PostgreSQL pada lingkungan development lokal.

### 1. Clone Repository

Clone repository ini ke komputer lokal:

```bash
git clone <repository-url>
```

### 2. Masuk ke Direktori Project

```bash
cd <inventory-management-backend>
```

### 3. Install Dependencies

Install seluruh package yang dibutuhkan:

```bash
npm install
```

### 4. Konfigurasi Database

Buat database PostgreSQL dengan nama:

```sql
CREATE DATABASE inventory_management;
```

Kemudian buat tabel yang dibutuhkan untuk menjalankan aplikasi.

### 5. Konfigurasi Environment Variables

Buat file `.env` pada root directory project.

Tambahkan environment variable berikut:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password
DB_NAME=inventory_management
```

Sesuaikan nilai environment variable dengan konfigurasi PostgreSQL yang digunakan.

### 6. Jalankan Aplikasi

Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

Jika server dan database berhasil terhubung, terminal akan menampilkan informasi bahwa database telah terhubung dan server sedang berjalan.

Server dapat diakses melalui:

```text
http://localhost:3000
```

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### Category

#### 1. Create Category

**Endpoint**

```http
POST /api/categories
```

**Request Body**

```json
{
  "nama": "Elektronik",
  "deskripsi": "Kategori produk elektronik"
}
```

**Response Berhasil**

Status Code: `201 Created`

```json
{
  "message": "Success create categories!"
}
```

---

#### 2. Get All Categories

**Endpoint**

```http
GET /api/categories
```

**Response Berhasil**

Status Code: `200 OK`

```json
[
  {
    "id": 1,
    "nama": "Elektronik",
    "deskripsi": "Kategori produk elektronik"
  }
]
```

---

#### 3. Get Category By ID

**Endpoint**

```http
GET /api/categories/:id
```

Contoh:

```http
GET /api/categories/1
```

---

#### 4. Update Category

**Endpoint**

```http
PATCH /api/categories/:id
```

**Request Body**

```json
{
  "nama": "Elektronik",
  "deskripsi": "Peralatan dan perangkat elektronik"
}
```

---

#### 5. Delete Category

**Endpoint**

```http
DELETE /api/categories/:id
```

Contoh:

```http
DELETE /api/categories/1
```

---

# Product

### 1. Create Product

**Endpoint**

```http
POST /api/products
```

**Request Body**

```json
{
  "nama_produk": "Mechanical Keyboard",
  "deskripsi": "Keyboard mechanical untuk kebutuhan komputer",
  "harga": 750000,
  "kategori_id": 1
}
```

**Response Berhasil**

Status Code: `201 Created`

```json
{
  "message": "Success create products!"
}
```

---

### 2. Get All Products

**Endpoint**

```http
GET /api/products
```

---

### 3. Get Product By ID

**Endpoint**

```http
GET /api/products/:id
```

Contoh:

```http
GET /api/products/1
```

---

### 4. Update Product

**Endpoint**

```http
PATCH /api/products/:id
```

**Request Body**

```json
{
  "nama_produk": "Mechanical Keyboard RGB",
  "harga": 850000
}
```

---

### 5. Delete Product

**Endpoint**

```http
DELETE /api/products/:id
```

Contoh:

```http
DELETE /api/products/1
```

---

# Stock Management

### 1. Stock In

Menambahkan stok produk sekaligus mencatat riwayat stok masuk.

**Endpoint**

```http
POST /api/products/:id/stock/in
```

Contoh:

```http
POST /api/products/1/stock/in
```

**Request Body**

```json
{
  "quantity": 10
}
```

**Response Berhasil**

Status Code: `201 Created`

```json
{
  "id_product": 1,
  "stok": 10,
  "quantity": 10,
  "type": "IN"
}
```

---

### 2. Stock Out

Mengurangi stok produk sekaligus mencatat riwayat stok keluar.

**Endpoint**

```http
POST /api/products/:id/stock/out
```

Contoh:

```http
POST /api/products/1/stock/out
```

**Request Body**

```json
{
  "quantity": 3
}
```

---

### 3. Get Current Product Stock

Melihat informasi stok produk berdasarkan ID.

**Endpoint**

```http
GET /api/products/:id/stock
```

Contoh:

```http
GET /api/products/1/stock
```

---

### 4. Get Stock History

Melihat seluruh riwayat pergerakan stok berdasarkan produk.

**Endpoint**

```http
GET /api/products/:id/stock/history
```

Contoh:

```http
GET /api/products/1/stock/history
```

**Contoh Response**

```json
[
  {
    "id": 1,
    "nama_produk": "Mechanical Keyboard",
    "type": "IN",
    "quantity": 10
  },
  {
    "id": 2,
    "nama_produk": "Mechanical Keyboard",
    "type": "OUT",
    "quantity": 3
  }
]
```

## Alur Stock Management

```text
Create Product
      ↓
Product memiliki stok awal
      ↓
Stock In / Stock Out
      ↓
Validasi Product
      ↓
Update jumlah stok
      ↓
Insert riwayat stok
      ↓
Database Transaction
      ↓
COMMIT
```

Jika terjadi kegagalan:

```text
Update Stock
      ↓
Insert Stock History
      ↓
ERROR
      ↓
ROLLBACK
```

Data stok dan riwayat stok akan dikembalikan ke kondisi sebelum transaction dijalankan.

## Struktur Project

```text
.
├── src/
│   ├── config/
│   │   └── dbConfig.js
│   ├── controllers/
│   │   ├── categoriesControllers.js
│   │   ├── productsControllers.js
│   │   └── riwayatStockControllers.js
│   ├── repository/
│   │   ├── categories.js
│   │   ├── products.js
│   │   └── riwayatStock.js
│   ├── routes/
│   │   ├── categoriesRoutes.js
│   │   ├── productsRoutes.js
│   │   └── riwayatStockRoutes.js
│   ├── services/
│   │   ├── categoriesServices.js
│   │   ├── productsServices.js
│   │   └── riwayatStockServices.js
│   └── validations/
│       ├── categoriesValidations.js
│       └── productsValidations.js
│       └── riwayatStockValidations.js
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

> Nama file pada struktur project dapat disesuaikan dengan struktur aktual pada repository.

## Konsep Backend yang Dipelajari

Project ini dibuat untuk memahami beberapa konsep dasar backend development, yaitu:

- REST API
- CRUD Operations
- HTTP Methods
- Dynamic Routing
- Node.js Native HTTP Module
- Layered Architecture
- Foreign Key Relationship
- SQL JOIN
- Database Transaction
- Parameterized Query

## Catatan

- Project ini menggunakan Node.js Native HTTP Module dan tidak menggunakan framework backend seperti Express.js.
- PostgreSQL digunakan sebagai relational database.
- Product memiliki relasi dengan Category melalui foreign key `kategori_id`.
- Stock history memiliki relasi dengan Product melalui foreign key `produk_id`.
- Stock In dan Stock Out menggunakan PostgreSQL Transaction.
- Setiap stock movement dicatat sebagai history baru dan tidak mengubah history sebelumnya.
- API diuji menggunakan Postman.
- Project ini dikembangkan dan diuji menggunakan Node.js v24.

## Pengembangan Selanjutnya

Beberapa fitur yang dapat ditambahkan pada pengembangan berikutnya:

- JWT Authentication
- Role-Based Authorization
- Pagination
- Search & Filter Product
- Purchase Order
- Stock Adjustment
- Deployment