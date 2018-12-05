# Github React

##### Description
React app that interacts with Github REST (V3) and GraphQL (V4) api to search for a user, if the user exists,
a short description about the user is displayed, as well as the repositories and followers/following lists. 

##### Demo
Please check the live **demo** here
https://githubreact.herokuapp.com

##### Development

```
npm i
npm run start:dev
```
Then navigate to http://localhost:3001

#### Technical details

###### Gitbub api

The user info and followers/following lists are fetched from **Github v3 api**,
while the repositories list is fetched using **Github GraphQl api (using apollo client)**.

###### Bundler
This app is using **webpack** as a code bundler.
**Bundle Splitting** (external libraries) and **code splitting** (for followers/following lists) are enabled.

Webpack-dev-server is used as the dev server with **Hot Module Replacement (HMR)** for faster
and more efficient development process.

HTML-webpack-plugin is used to inject the chuncks to the HTML template.

###### ESlint
Customized airbnb eslint rules are used to ensure consistent code around the website.

###### Routing
React router is used to handle the browser history and navigating between different routes.

###### Infinite scrolling
Making use of the github Link response header to enable **infinite scrolling to the following/followers list**.