import { describe, it, expect } from 'vitest';
import { contactFormSchema, adminLoginSchema } from '@/lib/validators';

const validContact = {
  first_name: 'Jean',
  last_name: 'Dupont',
  email: 'jean.dupont@example.com',
  phone: '06 12 34 56 78',
  subject: 'Demande info',
  message: 'Bonjour, je souhaite des informations sur ce produit.',
  contact_method: 'email' as const,
  product_name: 'iPhone 15',
  website: '',
};

describe('contactFormSchema', () => {
  it('accepts a valid payload', () => {
    expect(contactFormSchema.safeParse(validContact).success).toBe(true);
  });

  it('accepts an empty optional phone', () => {
    const result = contactFormSchema.safeParse({ ...validContact, phone: '' });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = contactFormSchema.safeParse({ ...validContact, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
    }
  });

  it('rejects a phone with letters', () => {
    const result = contactFormSchema.safeParse({ ...validContact, phone: 'abc' });
    expect(result.success).toBe(false);
  });

  it('rejects a too-short message (under 10 chars)', () => {
    const result = contactFormSchema.safeParse({ ...validContact, message: 'court' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('message');
    }
  });

  it('rejects a too-long message (over 5000 chars)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      message: 'a'.repeat(5001),
    });
    expect(result.success).toBe(false);
  });

  it('rejects a too-short first_name (under 2 chars)', () => {
    const result = contactFormSchema.safeParse({ ...validContact, first_name: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects an unknown contact_method', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      contact_method: 'sms' as never,
    });
    expect(result.success).toBe(false);
  });

  it('accepts each valid contact_method (email, phone, both)', () => {
    for (const method of ['email', 'phone', 'both'] as const) {
      const result = contactFormSchema.safeParse({ ...validContact, contact_method: method });
      expect(result.success).toBe(true);
    }
  });

  it('accepts a filled honey-pot field at the schema level (rejection happens silently in ContactForm)', () => {
    // Le schéma DOIT accepter n'importe quelle valeur de honey-pot pour permettre
    // au composant de simuler un succès sans signaler au bot qu'il a été détecté.
    const result = contactFormSchema.safeParse({ ...validContact, website: 'http://spam.example' });
    expect(result.success).toBe(true);
  });

  it('trims whitespace on string fields before validating', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      first_name: '  Jean  ',
      email: '  jean@example.com  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.first_name).toBe('Jean');
      expect(result.data.email).toBe('jean@example.com');
    }
  });
});

describe('adminLoginSchema', () => {
  it('accepts a valid login', () => {
    const result = adminLoginSchema.safeParse({ email: 'admin@example.com', password: 'secret' });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = adminLoginSchema.safeParse({ email: 'nope', password: 'secret' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty password', () => {
    const result = adminLoginSchema.safeParse({ email: 'admin@example.com', password: '' });
    expect(result.success).toBe(false);
  });
});
