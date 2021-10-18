// React
import React from 'react';
import { screen } from '@testing-library/react';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Children
import NotFound from '../pages/NotFound';

// History
let mockHistory = {};

describe('Testa a página NotFound', () => {
  const { history } = renderWithReduxAndRouter(<NotFound />);
  mockHistory = history;
  it('Exibe a page NotFound ao pesquisar URL inválida.', () => {
    const notFound = screen.getByRole('heading', { name: /not found/i });

    expect(notFound).toBeInTheDocument();

    mockHistory.push('/chinchilasAcademicas');
    expect(notFound).toBeInTheDocument();
  });
});
