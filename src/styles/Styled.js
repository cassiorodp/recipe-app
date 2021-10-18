import styled, { css } from 'styled-components';

/* ================== COLOR VARIABLES ================== */
// const black = '#1e2328'; // Dark Shades
const blackAlt = '#2a2e34';
const blackLighter = '#3b3f46';

const gray = '#D6D6D6'; // Light Shades
const lightGray = '#EBEAE8';
// const smokeWhite = '#f0f0f0';
const white = '#FFFDFA';

const yellow = '#fbcf14'; // Yellow Shades
const yellowAlt = '#ffc20f';
// const yellowDarker = '#FAB309';
const yellowPale = '#FAD84C';

/* ==================== COMPONENTS ==================== */

/* ============= DIV ============= */
// Container
export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-flow: row wrap;
  gap: .5rem;

  & > button {
    margin-left: 13.5px;
  }

  & > label {
    margin-left: 13.5px;
  }

  & > label:first-of-type {
    margin-left: 0;
  }

  & > label:last-of-type {
    margin-right: 0;
  }

  & > a {
    text-decoration: none;
  }

  ${(props) => props.recipes && css`
    align-items: flex-start;
    min-height: 90vh;
  `}
`;

// Wrapper
export const Wrapper = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 100vh;
  min-width: 100%;

  ${(props) => props.secondary && css`
    gap: 1rem;
    justify-content: flex-start;
    margin-top: 2rem;
  `}
`;

/* ============= FORM ============= */
export const LoginForm = styled.form`
  align-items: center;
  background: transparent;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  height: 50vh;
  padding: 20px;
  width: 100%;
`;

export const SearchForm = styled.form`
  align-items: center;
  box-shadow: inset 0 1px 4px ${lightGray};
  display: flex;
  flex-flow: column nowrap;
  height: 6.5rem;
  justify-content: space-evenly;
`;

/* ============= LOGO ============= */
export const Logo = styled.img`
  filter: drop-shadow(4px 4px 4px #4444dd80);
`;

/* ============= HEADINGS ============= */
export const H1 = styled.h1`
  font: 500 35px Poppins , sans-serif;
  user-select: none;
`;

export const H2 = styled.h2`
  font: 400 24px Poppins , sans-serif;
  user-select: none;
`;

/* ============= INPUT ============= */
export const TextInput = styled.input`
  appearance: none;
  background-color: ${white};
  border: 1px solid ${gray};
  border-radius: 1.2rem;
  box-shadow: 0 0 2px ${lightGray};
  color: ${blackLighter};
  height: 43.5px;
  padding: 10px 15px;
  width: 300px;

  &:focus {
    outline: 1px solid ${yellowAlt};
  }

  ${(props) => props.small && css`
    padding: 5px 9px 5px 14px;
    height: 36px;
    font: 400 15px Poppins , sans-serif;
    width: 250px;
  `}
`;

/* ============= LABEL ============= */
export const Label = styled.label`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;

  & > span {
    color: ${blackLighter};
    font: 500 15.5px Poppins , sans-serif;
    margin-bottom: 4px;
    margin-left: 4px;
  }

  ${(props) => props.row && css`
    align-items: center;
    flex-flow: row nowrap;
    margin: 0;
  `}
`;

/* ============= BUTTON ============= */
// Regular
export const Button = styled.button`
  appearance: none;
  background-color: ${yellow};
  border: 0;
  border-radius: 1.2rem;
  box-shadow: 0 0 2px ${lightGray};
  color: ${blackAlt};
  height: 43.5px;
  padding: 10px 15px;
  transition: .2s;
  width: 300px;

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &:disabled {
    background-color: ${yellowPale};
  }

  &:not(:disabled):hover {
    background-color: ${yellowAlt};
    box-shadow: 0 0 5px ${yellow};
  }

  ${(props) => props.small && css`
    padding: 5px 8.75px;
    font: 400 15px Poppins , sans-serif;
    height: 36px;
    width: 80px;
  `}
`;

// Icon Button
export const IconBtn = styled.button`
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  display: flex;
  justify-content: center;

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

/* ============= HEADER ============= */
export const HeaderSc = styled.header`
  align-items: center;
  background: transparent;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;

  & > h2 {
    white-space: nowrap;
    align-self: flex-end;
  }

  & > button {
    margin: 0 20px;
  }
`;
