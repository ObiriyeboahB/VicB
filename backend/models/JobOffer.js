import { query } from '../config/db.js';

export const createJobOffer = async (offerData) => {
  const { job_id, worker_id, offered_rate, message } = offerData;
  const result = await query(
    'INSERT INTO job_offers (job_id, worker_id, offered_rate, message) VALUES ($1, $2, $3, $4) RETURNING *',
    [job_id, worker_id, offered_rate, message]
  );
  return result.rows[0];
};

export const getJobOffers = async (job_id) => {
  const result = await query('SELECT * FROM job_offers WHERE job_id = $1 AND status = \'pending\' ORDER BY created_at DESC', [job_id]);
  return result.rows;
};

export const acceptJobOffer = async (offer_id, job_id) => {
  const offerResult = await query(
    'UPDATE job_offers SET status = \'accepted\' WHERE id = $1 RETURNING *',
    [offer_id]
  );

  const worker_id = offerResult.rows[0].worker_id;
  await query(
    'UPDATE jobs SET worker_id = $1, status = \'accepted\' WHERE id = $2',
    [worker_id, job_id]
  );

  await query(
    'UPDATE job_offers SET status = \'rejected\' WHERE job_id = $1 AND id != $2',
    [job_id, offer_id]
  );

  return offerResult.rows[0];
};

export const rejectJobOffer = async (offer_id) => {
  const result = await query(
    'UPDATE job_offers SET status = \'rejected\' WHERE id = $1 RETURNING *',
    [offer_id]
  );
  return result.rows[0];
};
