// Capitalizar uma palavra
const capitalize = (str) => {
  const lower = str.toLowerCase(); // A string em minúsculo
  const first = lower.charAt(0); // A primeira letra
  const upper = first.toUpperCase(); // A primeira letra em maiúsculo
  const remain = lower.slice(1, lower.length); // A string menos a primeira letra
  return upper + remain;
};

export default capitalize;
