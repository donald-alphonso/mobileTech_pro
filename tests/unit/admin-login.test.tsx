import { describe, it, expect, beforeEach, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  signIn: vi.fn(),
  isConfigured: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
}));

vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: () => mocks.isConfigured(),
  supabase: { auth: { signInWithPassword: mocks.signIn } },
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminLoginPage from '@/app/admin/login/page';

describe('AdminLoginPage', () => {
  beforeEach(() => {
    mocks.push.mockReset();
    mocks.signIn.mockReset();
    mocks.isConfigured.mockReset();
    mocks.isConfigured.mockReturnValue(true);
  });

  it('renders email, password fields and submit button', () => {
    render(<AdminLoginPage />);
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
  });

  it('shows a validation error when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<AdminLoginPage />);

    await user.click(screen.getByRole('button', { name: /se connecter/i }));

    const emailError = await screen.findByText(/email invalide/i);
    expect(emailError).toBeInTheDocument();
    expect(mocks.signIn).not.toHaveBeenCalled();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it('shows "Email invalide" when email format is invalid', async () => {
    const user = userEvent.setup();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email$/i), 'not-an-email');
    await user.type(screen.getByLabelText(/mot de passe/i), 'secret');
    await user.click(screen.getByRole('button', { name: /se connecter/i }));

    const emailError = await screen.findByText(/email invalide/i);
    expect(emailError).toBeInTheDocument();
    expect(mocks.signIn).not.toHaveBeenCalled();
  });

  it('shows configuration error message when Supabase is not configured', async () => {
    mocks.isConfigured.mockReturnValue(false);
    const user = userEvent.setup();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email$/i), 'admin@example.com');
    await user.type(screen.getByLabelText(/mot de passe/i), 'password123');
    await user.click(screen.getByRole('button', { name: /se connecter/i }));

    const message = await screen.findByText(/n'est pas configurée/i);
    expect(message).toBeInTheDocument();
    expect(mocks.signIn).not.toHaveBeenCalled();
  });

  it('shows "Email ou mot de passe incorrect" on wrong credentials', async () => {
    mocks.signIn.mockResolvedValue({ data: null, error: { message: 'Invalid' } });
    const user = userEvent.setup();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email$/i), 'admin@example.com');
    await user.type(screen.getByLabelText(/mot de passe/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /se connecter/i }));

    const errorMessage = await screen.findByText(/email ou mot de passe incorrect/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it('redirects to /admin on successful login', async () => {
    mocks.signIn.mockResolvedValue({ data: {}, error: null });
    const user = userEvent.setup();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email$/i), 'admin@example.com');
    await user.type(screen.getByLabelText(/mot de passe/i), 'password123');
    await user.click(screen.getByRole('button', { name: /se connecter/i }));

    await vi.waitFor(() => {
      expect(mocks.push).toHaveBeenCalledWith('/admin');
    });
  });
});
