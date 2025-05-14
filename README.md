# Aplikasi Todo List Fullstack (React + Node.js)

## Deskripsi Proyek
Aplikasi Todo List sederhana dengan frontend React dan backend Node.js/Express.  
Backend menyediakan API dengan autentikasi JWT, frontend berinteraksi dengan API tersebut.  
Panduan ini juga mencakup cara deploy aplikasi ke AWS EC2 dan GCP Compute Engine untuk praktikum cloud computing.

---

## Teknologi yang Digunakan
- Frontend: React.js  
- Backend: Node.js, Express  
- Autentikasi: JWT (JSON Web Token)  
- Deployment: AWS EC2 atau GCP Compute Engine, Nginx atau Apache, PM2

---

## Prasyarat
Sebelum memulai, pastikan kamu sudah memiliki:  
- Git terinstall di lokal dan server  
- Node.js dan npm (di server akan diinstall)  
- Pengetahuan dasar command line dan SSH

---

## Setup dan Pengembangan Lokal

### 1. Clone Repository
```bash
git clone https://github.com/Yudhriz/todolist.git
cd todolist
```

### 2. Setup Backend

#### Database MySQL
Jalankan SQL berikut di MySQL untuk membuat database dan tabel:
```sql
CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

```bash
cd backend
npm install
```
- Buat file .env di folder backend dengan isi variabel environment, contoh:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app
JWT_SECRET=49a3c8e95018d4c7934d30f20ce1dee7f097adb03aa3f8929f026bfc1f140f18
JWT_EXPIRES_IN=1d
PORT=4000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
- Aplikasi frontend akan berjalan di http://localhost:5173

### Build Frontend untuk Production
```bash
npm run build
```
- Hasil build akan berada di folder ``dist/``

