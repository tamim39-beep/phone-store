import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  passwoard: "",
  database: "phone_store_db",
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected succesfully!");
    connection.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
