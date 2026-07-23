import { query } from '../config/db.js';

export const createUser = async (userData) => {
  const { full_name, email, phone, password_hash, user_type, location, latitude, longitude } = userData;
  const result = await query(
    'INSERT INTO users (full_name, email, phone, password_hash, user_type, location, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [full_name, email, phone, password_hash, user_type, location, latitude, longitude]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const getUserById = async (id) => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateUser = async (id, updateData) => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.keys(updateData).forEach((key) => {
    fields.push(`${key} = $${paramCount}`);
    values.push(updateData[key]);
    paramCount++;
  });

  values.push(id);
  const result = await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0];
};

export const getAllWorkers = async (limit = 20, offset = 0) => {
  const result = await query(
    'SELECT * FROM users WHERE user_type = \'worker\' LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
};
