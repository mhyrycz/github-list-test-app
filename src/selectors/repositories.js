export default (repositories, { rows }) => {
  return repositories.slice(0, parseInt(rows));
};
