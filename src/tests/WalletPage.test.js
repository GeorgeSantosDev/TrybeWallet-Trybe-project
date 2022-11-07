import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testing Header component in Wallet page', () => {
  it('should have h3 element with the email', () => {
    const initialState = {
      user: {
        email: 'email@teste.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
        isEditing: false,
        expenseIdToEdit: '',
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const emailElement = screen.getByRole('heading', { name: /email@teste.com/i, level: 3 });
    expect(emailElement).toBeDefined();
  });
  it('should have h3 element with the 0.00 and BRL', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const currency = screen.getByRole('heading', { name: 'BRL', level: 3 });
    const totalexpenses = screen.getByRole('heading', { name: '0.00', level: 3 });

    expect(currency).toBeDefined();
    expect(totalexpenses).toBeDefined();
  });
  it('should change total expenses value when an expense is adding', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => mockData }));
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const textInputsElements = screen.getAllByRole('textbox');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(textInputsElements[0], '1');
    userEvent.type(textInputsElements[1], 'teste');

    userEvent.click(button);

    const totalexpenses = await screen.findByRole('heading', { name: '4.75', level: 3 });

    expect(totalexpenses).toBeDefined();
  });
});

describe('Testing WalletForm component in Wallet page', () => {
  it('should have two text inputs', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const textInputsElements = screen.getAllByRole('textbox');

    expect(textInputsElements).toHaveLength(2);
  });
  it('should have three select inputs', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const selectElements = screen.getAllByRole('combobox');

    expect(selectElements).toHaveLength(3);
  });
  it('should have a button with text Adicionar despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(button).toBeDefined();
  });
});

describe('Testing Table component in Wallet page', () => {
  it('should have full header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const tableHeadersElements = screen.getAllByRole('columnheader');

    expect(tableHeadersElements).toHaveLength(9);
  });
  it('should add at table an expense', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => mockData }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const textInputsElements = screen.getAllByRole('textbox');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(textInputsElements[0], '2');
    userEvent.type(textInputsElements[1], 'teste');
    userEvent.click(button);

    const tdElements = await screen.findAllByRole('cell');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(tdElements).toBeDefined();
    expect(tdElements).toHaveLength(9);
  });
  it('should delete an expense when click in delete button', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => mockData }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const textInputsElements = screen.getAllByRole('textbox');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(textInputsElements[0], '1');
    userEvent.type(textInputsElements[1], 'teste para excluir');
    userEvent.click(addExpenseButton);

    const deleteButton = await screen.findByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);

    const tdElements = screen.queryAllByRole('cell');
    expect(tdElements).toHaveLength(0);
  });
  it('should be able to edit an expense', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => mockData }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const textInputsElements = screen.getAllByRole('textbox');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(textInputsElements[0], '1');
    userEvent.type(textInputsElements[1], 'teste para excluir');
    userEvent.click(addExpenseButton);

    const editButton = await screen.findByRole('button', { name: /editar/i });
    userEvent.click(editButton);

    userEvent.type(textInputsElements[0], '2');
    userEvent.type(textInputsElements[1], 'teste para editar');

    const editExpenseButton = screen.getByRole('button', { name: /Editar despesa/i });
    userEvent.click(editExpenseButton);

    const tdElements = screen.getAllByRole('cell');
    expect(tdElements[0].innerHTML).toBe('teste para editar');
    expect(tdElements[3].innerHTML).toBe('2.00');
  });
  // it('should', () => {

  // });
  // it('should', () => {

  // });
  // it('should', () => {

  // });
});
