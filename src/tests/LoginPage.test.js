import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testing Login page', () => {
  it('should have two text inputs', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);

    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
  });
  it('should have a button', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });

    expect(button).toBeDefined();
  });
  it('should button be disable with wrong type of email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'teste.com.br');
    userEvent.type(inputPassword, '123456');

    expect(button.disabled).toBeTruthy();
  });
  it('should button be disable with a password length less then 6 characters', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345');

    expect(button.disabled).toBeTruthy();
  });
  it('should button able', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'teste@teste2.com');
    userEvent.type(inputPassword, '123456');

    expect(button.disabled).toBeFalsy();
  });
  it('should redirect to Wallet page', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'teste@teste3.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});
