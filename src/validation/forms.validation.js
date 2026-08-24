import { z } from 'zod';

const email = z.string().trim().toLowerCase().email('Enter a valid email address.');

export const loginFormSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required.'),
});

export const registerFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  middleName: z.string().trim(),
  lastName: z.string().trim().min(1, 'Last name is required.'),
  email,
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  confirmPassword: z.string().min(1, 'Confirm your password.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

const optionalDate = z.string().trim().refine((value) => {
  if (!value) return true;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`));
}, 'Use YYYY-MM-DD.');

export const accountFormSchema = z.object({
  name: z.string().trim().min(1, 'Service or account name is required.'),
  username: z.string().trim(),
  category: z.enum(['social', 'email', 'banking', 'finance', 'work', 'school', 'subscription', 'other']),
  websiteUrl: z.union([z.literal(''), z.string().trim().url('Enter a complete URL, including https://.')]),
  notes: z.string().trim().max(1000, 'Notes cannot exceed 1,000 characters.'),
  status: z.enum(['active', 'expired', 'archived']),
  renewalDate: optionalDate,
  expirationDate: optionalDate,
});

export function getFieldErrors(result) {
  if (result.success) return {};

  return result.error.issues.reduce((errors, issue) => {
    const field = issue.path[0];
    if (field && !errors[field]) errors[field] = issue.message;
    return errors;
  }, {});
}
