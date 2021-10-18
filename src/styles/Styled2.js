import styled from 'styled-components';

/* ================== COLOR VARIABLES ================== */
const blackLighter = '#3b3f46';

const gray = '#D6D6D6'; // Light Shades
const lightGray = '#EBEAE8';
const smokeWhite = '#f0f0f0';
const white = '#FFFDFA';

const green = '#7AC74F'; // Other
const pistachio = '#A1CF6B';
const khaki = '#D5D887';
const flax = '#E0C879';
const terracota = '#E87461';
const periwinkle = '#D2D3EE';

const colorRandomizer = () => {
  const arr = [green, pistachio, khaki, flax, terracota, periwinkle];
  return arr[Math.floor(Math.random() * arr.length)];
};

/* ==================== COMPONENTS ==================== */
/* ============= HORIZONTAL LIST ============= */
export const List = styled.div`
  align-items: center;
  box-shadow: inset 0 1px 4px ${lightGray}, inset 0 -1px 4px ${lightGray};
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 3.5em;
  gap: .25em;
  margin-bottom: 1em;
  overflow-y: hidden;
`;

/* ============= CARD ============= */
export const Card = styled.div`
  border: 1px solid ${gray};
  border-radius: .3em;
  color: ${blackLighter};
  display: flex;
  flex-flow: column nowrap;
  height: 170px;
  justify-content: flex-end;
  width: 170px;

  & > span {
    background-color: ${smokeWhite}95;
    font: 400 16px Poppins , sans-serif;
    padding: 13.5px;
    text-align: center;
    width: 100%;
  }

  &:hover {
    & > span {
      background-color: ${periwinkle}95;
    }
  }
`;

/* ============= FOOTER ============= */
export const FooterSc = styled.footer`
  align-items: center;
  background: transparent;
  box-shadow: inset 0 1px 4px ${lightGray};
  display: flex;
  height: 3.5em;
  justify-content: space-between;
  margin-top: 1em;
  width: 100%;

  & > button {
    margin: 0 20px;
  }
`;

/* ============= DETAILS ============= */
// Thumb
export const DetailsThumb = styled.div`
  position: fixed;
  top: 0;

  & > img {
    height: auto;
    width: 100vw;
  }
`;

// Buttons
export const DetailsBtns = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  gap: .8em;
  position: static;
  width: 100%;

  & > button:last-of-type {
    margin-right: .8em;
  }
`;

// Content
export const DetailsContent = styled.div`
  align-items: flex-start;
  background-color: ${white};
  box-shadow: 0 -4px 180px ${colorRandomizer()}90;
  display: flex;
  flex-flow: column nowrap;
  height: auto;
  position: absolute;
  top: 35vh;
  width: 100vw;

  & > h1,
  & > h2,
  & > span,
  & > p,
  & > ol,
  & > .details-video,
  & > .details-category {
    margin: 0 auto;
    padding: 0 1.6em;
  }

  & > .details-title {
    font: 400 2.25rem Poppins , sans-serif;
  }

  & > .details-category {
    margin: 1em auto;
  }

  & > h2 {
    font: 500 1.5rem Poppins , sans-serif;
    margin: 1em auto;
  }

  & > p, & > ol > li, & > .details-category {
    color: ${blackLighter};
    font: 400 1.1rem Poppins , sans-serif;
  }

  & > ol, & > .details-instructions {
    margin-bottom: 1em;
  }

  & > .details-video {
    border: 0;
    margin: 1em auto 2em;
  }
`;

// Carousel
export const Carousel = styled.div`
  align-items: center;
  background-color: ${lightGray};
  display: flex;
  gap: 1.25em;
  padding: 1.5em 0;
  margin: 0 0 3em;
  overflow: scroll hidden;
  width: 100%;

  & > div:first-of-type {
    margin-left: 1.25em;
  }

  & > div:last-of-type {
    margin-right: 1.25em;
  }

  & > .carousel-card {
    background-color: ${white};
    border: 0;
    border-radius: .3em;
    display: flex;
    flex-flow: column nowrap;
    min-height: 15em;
    min-width: 10em;
  }

  & > .carousel-card > .card-thumb {
    border-radius: .3em .3em 0 0;
  }

  & > .carousel-card > .card-cat {
    font: 400 1rem Poppins , sans-serif;
    margin: .5em auto 0;
  }

  & > .carousel-card > .card-title {
    font: 500 1.25rem Poppins , sans-serif;
    margin: .25em auto 0;
  }
`;

export const CheckboxList = styled.ol`
  align-items: flex-start;
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;

  & > li > label > span {
    margin: .25em;
  }
`;

/* ============= EXPLORE ============= */
export const Dropdown = styled.select`
  border: 1px solid ${gray};
  border-radius: .3em;
  font: 400 1.15rem Poppins , sans-serif;
  margin: 1em auto;
  outline: 0;
  padding: 3px 10px;
`;
