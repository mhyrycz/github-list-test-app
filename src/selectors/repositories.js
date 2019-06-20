export default (repositories, { rows, page }) => {
  return repositories.slice(0 + page * rows, rows + page * rows);
};
