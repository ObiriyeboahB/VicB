import { createUser, getUserByEmail } from '../models/User.js';
import { createWorkerProfile } from '../models/WorkerProfile.js';
import { hashPassword, comparePasswords } from '../utils/helpers.js';
import { generateToken } from '../config/jwt.js';
import { registerValidation, loginValidation } from '../middleware/validation.js';

export const register = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await getUserByEmail(value.email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const password_hash = await hashPassword(value.password);
    const user = await createUser({
      full_name: value.full_name,
      email: value.email,
      phone: value.phone,
      password_hash,
      user_type: value.user_type,
      location: value.location,
      latitude: value.latitude,
      longitude: value.longitude,
    });

    if (value.user_type === 'worker') {
      await createWorkerProfile({
        user_id: user.id,
        skills: value.skills || [],
        hourly_rate: value.hourly_rate || 0,
        is_negotiable: value.is_negotiable !== false,
        bio: value.bio || '',
      });
    }

    const token = generateToken({ id: user.id, email: user.email, user_type: user.user_type });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, user_type: user.user_type },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await getUserByEmail(value.email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePasswords(value.password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user.id, email: user.email, user_type: user.user_type });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, user_type: user.user_type },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    res.json({
      message: 'User fetched successfully',
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
