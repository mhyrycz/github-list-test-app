const repositoriesReducerDefaultState = [];

export default (state = repositoriesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_REPOSITORIES":
      const repositories = action.repositories.map(repo => ({
        id: repo.id,
        name: repo.name,
        owner: repo.owner,
        stargazers_count: repo.stargazers_count,
        created_at: repo.created_at
      }));

      return [...state, ...repositories];
    case "REMOVE_REPOSITORIES":
      return repositoriesReducerDefaultState;
    default:
      return state;
  }
};
