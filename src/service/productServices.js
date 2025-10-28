import { pool } from "../config/db.js";

// Ambil semua produk
export const getAllProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

// Ambil produk berdasarkan ID
export const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

// Tambah produk baru
export const createProduct = async (data) => {
  const { name, price, category, user_id } = data;
  const [result] = await pool.query(
    "INSERT INTO products (name, price, category, user_id) VALUES (?, ?, ?, ?)",
    [name, price, category, user_id]
  );
  return { id: result.insertId, ...data };
};

// Update produk
export const updateProduct = async (id, data) => {
  const { name, price, category, user_id } = data;
  await pool.query(
    "UPDATE products SET name=?, price=?, category=?, user_id=? WHERE id=?",
    [name, price, category, user_id, id]
  );
  return { id, ...data };
};

// Hapus produk
export const deleteProduct = async (id) => {
  await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return { message: "Product deleted successfully" };
};
