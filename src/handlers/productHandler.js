import { pool } from "../config/db.js";

// ============================================================
//  GET ALL PRODUCTS
// ============================================================
export const getAllProductsHandler = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");

    res.status(200).json({
      status: "success",
      message: "Data produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data produk",
      error: error.message,
    });
  }
};

// ============================================================
//  GET PRODUCT BY ID
// ============================================================
export const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (product.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Detail produk berhasil diambil",
      data: product[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil detail produk",
      error: error.message,
    });
  }
};

// ============================================================
//  ADD PRODUCT
// ============================================================
export const addProductHandler = async (req, res) => {
  try {
    const { user_id, name, description, price, stock } = req.body;

    if (!user_id || !name || !price) {
      return res.status(400).json({
        status: "fail",
        message: "user_id, name, dan price wajib diisi",
      });
    }

    const query = `
      INSERT INTO products (user_id, name, description, price, stock)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.query(query, [user_id, name, description, price, stock || 0]);

    res.status(201).json({
      status: "success",
      message: "Produk berhasil ditambahkan",
      data: { user_id, name, description, price, stock },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal menambahkan produk",
      error: error.message,
    });
  }
};

// ============================================================
//  UPDATE PRODUCT BY ID
// ============================================================
export const updateProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (product.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`,
      });
    }

    const query = `
      UPDATE products
      SET name = ?, description = ?, price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await pool.query(query, [name, description, price, stock, id]);

    res.status(200).json({
      status: "success",
      message: "Produk berhasil diperbarui",
      data: { id, name, description, price, stock },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui produk",
      error: error.message,
    });
  }
};

// ============================================================
//  DELETE PRODUCT BY ID
// ============================================================
export const deleteProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (product.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Produk dengan ID ${id} tidak ditemukan`,
      });
    }

    await pool.query("DELETE FROM products WHERE id = ?", [id]);

    res.status(200).json({
      status: "success",
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal menghapus produk",
      error: error.message,
    });
  }
};
