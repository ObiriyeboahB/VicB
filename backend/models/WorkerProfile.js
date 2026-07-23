import { query } from '../config/db.js';

export const createWorkerProfile = async (profileData) => {
  const { user_id, skills, hourly_rate, is_negotiable, bio } = profileData;
  const result = await query(
    'INSERT INTO worker_profiles (user_id, skills, hourly_rate, is_negotiable, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, skills, hourly_rate, is_negotiable, bio]
  );
  return result.rows[0];
};

export const getWorkerProfile = async (user_id) => {
  const result = await query('SELECT * FROM worker_profiles WHERE user_id = $1', [user_id]);
  return result.rows[0];
};

export const updateWorkerProfile = async (user_id, updateData) => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.keys(updateData).forEach((key) => {
    fields.push(`${key} = $${paramCount}`);
    values.push(updateData[key]);
    paramCount++;
  });

  values.push(user_id);
  const result = await query(
    `UPDATE worker_profiles SET ${fields.join(', ')} WHERE user_id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0];
};

export const toggleAvailability = async (user_id) => {
  const result = await query(
    'UPDATE worker_profiles SET is_available = NOT is_available WHERE user_id = $1 RETURNING *',
    [user_id]
  );
  return result.rows[0];
};
