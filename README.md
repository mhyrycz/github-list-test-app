# github-list-test-app

## Installation
after cloning use ```yarn install``` to add node-modules.

## How to run
```
$ cd ~/your_directory/callstack-test-app
$ yarn run dev-server
```
Information about localhost port is avaiable when server is started.

## Test checklist

1. Render table with repository ID, title, owner, starts and created at timestamp

		Done
2. Render an <input> element to search for repositories by name

		Done. Default repository name is 'react'.
3. Cache the results of every search - do not make an API request if the results are already stored, instead show them from some storage like localStorage

		Done. Information stored in Redux State. You may use https://github.com/zalmoxisus/redux-devtools-extension to track State.
4. Do not fire requests as long as the user is typing - use throttle or debounce

		Done. Used lodash/debounce.
5. Implement pagination (locally, not by using API queries)

		Done
6. Add ability to control number of rows rendered per page (5 - default/10/15/20)

		Done
7. Implement ASC/DESC sorting by every column

		Done. Click on Column header to sort. Default Sort by stars.
8. Persist last search query and results - when we go back to the page or refresh it should show the last results of search

		Done. Persisting Redux State to Local Storage.
9. Add GitHub authentication mechanism (eg: Log in with GitHub button) and highlight the row of repository of the logged-in user - please note that some users have 2FA enabled

		Done. It is required to provide GitHub personal access token to sign in to app. Repositories of signed user are highlighted.
    
Optional:

1. Use linting and/or formatting tool - ESLint, Prettier (if you use @callstack/eslint-config you should be good to go)

		Done. Used formatting tool - Prettier.
2. Write good README in terms of instructions for reviewers

		Done


#Thoughts

1. GitHub API repositories endpoint allows to find repositories by keywords. So, the preview contains all repositories including keyword in the name and these where keyword is not included in the name but connected with it. I decided to render all repositories containing input in the name of repository. 

