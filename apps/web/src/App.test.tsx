import { describe,it,expect } from 'vitest';
import { render,screen } from '@testing-library/react';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('EcoTrack app shell',()=>{it('shows the login experience when no session exists',()=>{const client=new QueryClient({defaultOptions:{queries:{retry:false}}});render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/login']}><App/></MemoryRouter></QueryClientProvider>);expect(screen.getByText('Sign in to EcoTrack')).toBeInTheDocument();expect(screen.getByLabelText('Email address')).toBeInTheDocument();});});


describe('EcoTrack registration',()=>{it('shows the account creation form at /register',()=>{const client=new QueryClient({defaultOptions:{queries:{retry:false}}});render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/register']}><App/></MemoryRouter></QueryClientProvider>);expect(screen.getByText('Create your account')).toBeInTheDocument();expect(screen.getByLabelText('Full name')).toBeInTheDocument();expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();expect(screen.getByRole('link',{name:'Sign in'})).toHaveAttribute('href','/login');});});
