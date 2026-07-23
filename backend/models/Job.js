import { query } from '../config/db.js';

export const createJob = async (jobData) => {
  const { client_id, title, description, category, location, latitude, longitude, budget, payment_type, is_urgent, scheduled_time } = jobData;
  const result = await query(
    'INSERT INTO jobs (client_id, title, description, category, location, latitude, longitude, budget, payment_type, is_urgent, scheduled_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    [client_id, title, description, category, location, latitude, longitude, budget, payment_type, is_urgent, scheduled_time]
  );
  return result.rows[0];
};

export const getJobById = async (id) => {
  const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllJobs = async (filters = {}, limit = 20, offset = 0) => {
  let whereClause = 'WHERE status = \'open\'';
  const values = [];
  let paramCount = 1;

  if (filters.category) {
    whereClause += ` AND category = $${paramCount}`;
    values.push(filters.category);
    paramCount++;
  }

  if (filters.location) {
    whereClause += ` AND location ILIKE $${paramCount}`;
    values.push(`%${filters.location}%`);
    paramCount++;
  }

  if (filters.is_urgent) {
    whereClause += ` AND is_urgent = $${paramCount}`;
    values.push(filters.is_urgent);
    paramCount++;
  }

  values.push(limit);
  values.push(offset);

  const result = await query(
    `SELECT * FROM jobs ${whereClause} ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
    values
  );
  return result.rows;
};

export const updateJobStatus = async (id, status) => {
  const result = await query(
    'UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

export const getJobsByClientId = async (client_id, limit = 20, offset = 0) => {
  const result = await query(
    'SELECT * FROM jobs WHERE client_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [client_id, limit, offset]
  );
  return result.rows;
};

export const getJobsByWorkerId = async (worker_id, limit = 20, offset = 0) => {
  const result = await query(
    'SELECT * FROM jobs WHERE worker_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [worker_id, limit, offset]
  );
  return result.rows;
};
