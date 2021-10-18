import styled, { css } from 'styled-components';

/* ================== COLOR VARIABLES ================== */
const blackLighter = '#3b3f46'; // Dark Shades
const gray = '#D6D6D6'; // Light Shades
const smokeWhite = '#f0f0f0';

/* ==================== COMPONENTS ==================== */
// Extended Card (for Done and Favorite recipes)
const CardExt = styled.div`
  border: 1px solid ${gray}; 
  border-radius: .6em;
  color: ${blackLighter};
  display: flex;
  flex-flow: column nowrap;
  height: auto;
  justify-content: flex-start;
  margin: .25em auto;
  width: 25em;

  & > .card-ext-content {
    background-color: ${smokeWhite};
    border-radius: .6em 0 0 0;
    display: flex;
    height: 7.75em;
    text-align: center;

    & > .card-ext-thumb {
      display: flex;
      flex: 1;

      & > img {
        border-radius: .6em 0 0 0;
        width: 100%;
      }
    }

    & > .card-ext-info {
      align-items: center;
      display: flex;
      flex: 1.25;
      flex-flow: column nowrap;
      justify-content: center;
    }

    & > .card-ext-date {
      align-items: center;
      display: flex;
      flex: 1;
      justify-content: center;
    }
  }

  & > .card-ext-taglist {
    align-items: center;
    display: flex;
    height: 35px;

    & > .uil-tag-alt {
      margin-left: .20em;
      margin-right: .5em;
    }

    & > .recipe-tag {
      margin: 0 .2em;
    }

    & > button {
      margin-left: auto;
      margin-right: .5em;
    }
  }

  ${(props) => props.favorite && css`
    & > .card-ext-content > .card-ext-info {
      flex: 2;
    }

    & > .card-ext-buttons {
      align-items: center;
      justify-content: space-between;
      display: flex;
      height: 35px;

      & > button {
        margin: 0 1em;
      }
    }
  `}
`;

export default CardExt;
