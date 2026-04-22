import { describe, it, expect, beforeEach, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  isConfigured: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: () => mocks.isConfigured(),
  supabase: {
    from: () => ({ insert: mocks.insert }),
  },
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/contact-form';

describe('ContactForm', () => {
  beforeEach(() => {
    mocks.insert.mockReset();
    mocks.isConfigured.mockReset();
    mocks.isConfigured.mockReturnValue(true);
    mocks.insert.mockResolvedValue({ data: null, error: null });
  });

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/Prénom \*/i), 'Jean');
    await user.type(screen.getByLabelText(/^Nom \*/i), 'Dupont');
    await user.type(screen.getByLabelText(/^Email \*/i), 'jean.dupont@example.com');
    await user.type(screen.getByLabelText(/Sujet \*/i), 'Bonjour je cherche un produit');
    await user.type(
      screen.getByLabelText(/Message \*/i),
      'Ceci est un message de test valide avec suffisamment de caractères.'
    );
  };

  it('renders with all expected fields and submit button', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Prénom \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nom \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sujet \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /envoyer/i }));

    const firstNameError = await screen.findByText('Le prénom doit contenir au moins 2 caractères');
    const lastNameError = await screen.findByText('Le nom doit contenir au moins 2 caractères');
    const emailError = await screen.findByText(/email invalide/i);

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it('honey-pot: skips insert and still shows success when website field is filled', async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await fillValidForm(user);

    const honeyPot = container.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeyPot).not.toBeNull();
    await user.type(honeyPot, 'http://spam.example');

    await user.click(screen.getByRole('button', { name: /envoyer/i }));

    const successAlert = await screen.findByText(/votre message a été envoyé avec succès/i);
    expect(successAlert).toBeInTheDocument();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it('demo mode (Supabase not configured): shows success and amber demo alert without calling insert', async () => {
    mocks.isConfigured.mockReturnValue(false);
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(screen.getByText(/mode démo/i)).toBeInTheDocument();

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /envoyer/i }));

    const successAlert = await screen.findByText(/votre message a été envoyé avec succès/i);
    expect(successAlert).toBeInTheDocument();
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(screen.getByText(/mode démo/i)).toBeInTheDocument();
  });

  it('Supabase happy path: inserts payload with status "new" and without website key', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /envoyer/i }));

    await screen.findByText(/votre message a été envoyé avec succès/i);

    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.insert).toHaveBeenCalledWith([
      expect.objectContaining({
        status: 'new',
        first_name: 'Jean',
      }),
    ]);

    const payload = mocks.insert.mock.calls[0][0][0];
    expect('website' in payload).toBe(false);
  });

  it('shows an error alert when Supabase insert returns an error', async () => {
    mocks.insert.mockResolvedValue({ data: null, error: { message: 'boom' } });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /envoyer/i }));

    const errorAlert = await screen.findByText(/une erreur est survenue/i);
    expect(errorAlert).toBeInTheDocument();
  });
});
