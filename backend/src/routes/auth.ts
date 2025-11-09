import type { Request, Response } from 'express';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber
} from '../utils/validators.js';

interface SignupRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  phone?: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const router = Router();

router.post(
  '/signup',
  async (req: Request<unknown, unknown, SignupRequestBody>, res: Response) => {
    try {
      const { email, password, confirmPassword, name, phone } = req.body;

      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid || !emailValidation.formatted) {
        return res.status(400).json({ error: emailValidation.message ?? 'Invalid email' });
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({ error: passwordValidation.message });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        return res.status(400).json({ error: 'Please enter a valid name' });
      }

      const phoneValidation = validatePhoneNumber(phone);
      if (!phoneValidation.isValid) {
        return res.status(400).json({ error: 'Please enter a valid phone number' });
      }

      const userExists = await pool.query<{ id: string }>(
        'SELECT id FROM users WHERE email = $1',
        [emailValidation.formatted]
      );

      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const result = await pool.query<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        created_at: string;
      }>(
        'INSERT INTO users (email, password_hash, name, phone) VALUES ($1, $2, $3, $4) RETURNING id, email, name, phone, created_at',
        [
          emailValidation.formatted,
          passwordHash,
          nameValidation.formatted ?? null,
          phoneValidation.formatted ?? null
        ]
      );

      const newUser = result.rows[0];
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        console.error('JWT_SECRET is not configured.');
        return res.status(500).json({ error: 'Server configuration error' });
      }

      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, secret, {
        expiresIn: '7d'
      });

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          created_at: newUser.created_at
        },
        token
      });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.post('/login', async (req: Request<unknown, unknown, LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query<{
      id: string;
      email: string;
      password_hash: string;
      created_at: string;
    }>('SELECT id, email, password_hash, created_at FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('JWT_SECRET is not configured.');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '7d' });

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (_req, res: Response) => {
  return res.json({ message: 'Logout successful' });
});

export default router;

