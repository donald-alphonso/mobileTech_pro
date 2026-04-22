import { z } from 'zod';

export const contactFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(80, 'Le prénom est trop long'),
  last_name: z
    .string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(80, 'Le nom est trop long'),
  email: z
    .string()
    .trim()
    .email('Email invalide')
    .max(254, 'Email trop long'),
  phone: z
    .string()
    .trim()
    .max(30, 'Numéro trop long')
    .regex(/^[\d\s+().-]*$/, 'Format de téléphone invalide')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .trim()
    .min(3, 'Sujet trop court')
    .max(200, 'Sujet trop long'),
  message: z
    .string()
    .trim()
    .min(10, 'Message trop court (10 caractères minimum)')
    .max(5000, 'Message trop long (5000 caractères maximum)'),
  contact_method: z.enum(['email', 'phone', 'both']),
  product_name: z.string().trim().max(200).optional().or(z.literal('')),
  // Honey-pot : accepte n'importe quelle valeur. Le rejet silencieux est dans
  // ContactForm.onSubmit pour ne pas signaler aux bots qu'ils ont été détectés.
  website: z.string().max(200).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
