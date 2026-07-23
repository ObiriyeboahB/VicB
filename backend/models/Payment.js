import { query } from '../config/db.js';

export const createPayment = async (paymentData) => {
  const { job_id, client_id, worker_id, amount, platform_fee, worker_earning, payment_reference } = paymentData;
  const result = await query(
    'INSERT INTO payments (job_id, client_id, worker_id, amount, platform_fee, worker_earning, payment_reference) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [job_id, client_id, worker_id, amount, platform_fee, worker_earning, payment_reference]
  );
  return result.rows[0];
};

export const getPayment = async (id) => {
  const result = await query('SELECT * FROM payments WHERE id = $1', [id]);
  return result.rows[0];
};

export const getPaymentByReference = async (payment_reference) => {
  const result = await query('SELECT * FROM payments WHERE payment_reference = $1', [payment_reference]);
  return result.rows[0];
};

export const updatePaymentStatus = async (id, status) => {
  const result = await query(
    'UPDATE payments SET payment_status = $1, paid_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

export const getPaymentsByUserId = async (user_id, limit = 20, offset = 0) => {
  const result = await query(
    'SELECT * FROM payments WHERE client_id = $1 OR worker_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [user_id, limit, offset]
  );
  return result.rows;
};
