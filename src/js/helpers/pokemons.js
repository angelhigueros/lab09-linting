const importIMages = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

export const images = importIMages(
  require.context("../../assets/img/pokemons", false, /\.(png|jpe?g|svg)$/)
);
