// React
import React, { useEffect, useState } from 'react';

// Router
import { useLocation } from 'react-router';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/actions';

// Styles
import {
  Button,
  Container,
  TextInput,
  Label,
  SearchForm,
} from '../styles/Styled';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchFilter, setSearchFilter] = useState('ingredient');

  const path = useLocation().pathname.split('/')[1];

  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipes.results.meals);
  console.log(meals);

  useEffect(() => {
    if (!meals) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [meals]);

  const handleSubmit = () => {
    if (searchFilter === 'first-letter' && searchText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      dispatch(fetchRecipes(searchText, searchFilter, path));
    }
  };

  // Category Button
  function filterClick(evt) {
    // Set filter
    const { value } = evt.target;
    setSearchFilter(value);

    // Apply Styles
    const radios = document.querySelectorAll('.radio-btn');
    radios.forEach((btn) => btn.classList.remove('radio-selected'));

    const { target } = evt;
    target.classList.add('radio-selected');
  }

  return (
    <SearchForm className="search-bar">
      {/* Opções de filtro */}
      <Container>
        <Label htmlFor="ingredient" row>
          Ingrediente
          <input
            id="ingredient"
            value="ingredient"
            type="radio"
            name="search-filter"
            data-testid="ingredient-search-radio"
            onChange={ (evt) => filterClick(evt) }
            className="radio-btn radio-selected"
          />
        </Label>
        <Label htmlFor="name" row>
          Nome
          <input
            id="name"
            value="name"
            type="radio"
            name="search-filter"
            data-testid="name-search-radio"
            onChange={ (evt) => filterClick(evt) }
            className="radio-btn"
          />
        </Label>
        <Label htmlFor="first-letter" row>
          Primeira Letra
          <input
            id="first-letter"
            value="first-letter"
            type="radio"
            name="search-filter"
            data-testid="first-letter-search-radio"
            onChange={ (evt) => filterClick(evt) }
            className="radio-btn"
          />
        </Label>
      </Container>
      <Container>
        {/* Input */}
        <TextInput
          type="text"
          placeholder="Digite um termo de busca..."
          id="search-input"
          data-testid="search-input"
          value={ searchText }
          onChange={ ({ target: { value } }) => setSearchText(value) }
          small
        />

        {/* Botão Pesquisar */}
        <Button
          onClick={ () => handleSubmit() }
          disabled={ searchText.length < 1 }
          type="button"
          data-testid="exec-search-btn"
          small
        >
          Buscar
        </Button>
      </Container>
    </SearchForm>
  );
}

export default SearchBar;
