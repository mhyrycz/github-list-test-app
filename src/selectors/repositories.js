export default (repositories, { rows, page, sortBy, sortDirection }) => {
  let sortedRepos = repositories.sort((a, b) => {
    if (sortDirection) {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  if (sortBy !== "id") {
    const groupedByProperty = groupByProperty(sortedRepos, sortBy);
    const sortedByID = sortObjectsById(groupedByProperty);
    sortedRepos = mergeObjectToArray(sortedByID, sortDirection);
  }
  let slicedRepos = sortedRepos.slice(0 + page * rows, rows + page * rows);
  return slicedRepos;
};

const groupByProperty = (array, property) => {
  let grouped = {};
  for (let i = 0; i < array.length; i++) {
    let p = array[i][property];
    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(array[i]);
  }
  return grouped;
};

const sortObjectsById = groupedByProperty => {
  Object.entries(groupedByProperty).forEach(entry => {
    let value = entry[1];
    value.sort((a, b) => {
      return a.id > b.id ? -1 : 1;
    });
  });
  return groupedByProperty;
};

const mergeObjectToArray = (object, direction) => {
  let keys = Object.keys(object);
  if (direction) {
    keys;
  } else {
    keys = keys.sort(function(a, b) {
      return b - a;
    });
  }
  let merged = [];
  keys.map(key => {
    merged = merged.concat(object[key]);
  });
  return merged;
};
