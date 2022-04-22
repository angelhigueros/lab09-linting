const importIMages = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importIMages(
  require.context('../../assets/img/pokemons', false, /\.(png|jpe?g|svg)$/),
);

export default images;
