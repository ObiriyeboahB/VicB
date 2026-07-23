import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    return await bcryptjs.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePasswords = async (password, hash) => {
  try {
    return await bcryptjs.compare(password, hash);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Haversine formula to calculate distance between two coordinates
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Format response
export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message, error = null) => {
  return {
    success: false,
    message,
    error,
  };
};
