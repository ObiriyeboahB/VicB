import { query } from '../config/db.js';

export const createMessage = async (messageData) => {
  const { job_id, sender_id, receiver_id, content } = messageData;
  const result = await query(
    'INSERT INTO messages (job_id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING *',
    [job_id, sender_id, receiver_id, content]
  );
  return result.rows[0];
};

export const getMessages = async (job_id, limit = 50, offset = 0) => {
  const result = await query(
    'SELECT * FROM messages WHERE job_id = $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3',
    [job_id, limit, offset]
  );
  return result.rows;
};

export const markMessageAsRead = async (message_id) => {
  const result = await query(
    'UPDATE messages SET is_read = true WHERE id = $1 RETURNING *',
    [message_id]
  );
  return result.rows[0];
};

export const getUnreadMessages = async (receiver_id) => {
  const result = await query(
    'SELECT * FROM messages WHERE receiver_id = $1 AND is_read = false ORDER BY created_at DESC',
    [receiver_id]
  );
  return result.rows;
};
