export default (repositories, { rows, page, sortBy, sortDirection }) => {
  let sortedRepos = repositories.sort((a, b) => {
    if (sortDirection) {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  let slicedRepos = sortedRepos.slice(0 + page * rows, rows + page * rows);
  return slicedRepos;
};
