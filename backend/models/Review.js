import { query } from '../config/db.js';

export const createReview = async (reviewData) => {
  const { job_id, reviewer_id, reviewed_id, rating, comment } = reviewData;
  const result = await query(
    'INSERT INTO reviews (job_id, reviewer_id, reviewed_id, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [job_id, reviewer_id, reviewed_id, rating, comment]
  );
  return result.rows[0];
};

export const getReviews = async (reviewed_id) => {
  const result = await query(
    'SELECT * FROM reviews WHERE reviewed_id = $1 ORDER BY created_at DESC',
    [reviewed_id]
  );
  return result.rows;
};

export const getAverageRating = async (reviewed_id) => {
  const result = await query(
    'SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews FROM reviews WHERE reviewed_id = $1',
    [reviewed_id]
  );
  return result.rows[0];
};
