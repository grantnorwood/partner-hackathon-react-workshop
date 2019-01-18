# partner-hackathon-react-workshop
Sample application to provide a UI rendering Marketplace Design GraphQL queries.

## Prerequisites
 * Node 8+
 * NPM 5.6+
 
## What's Included?
This project was created using `create-react-app`.  It adds the following:
  * React
  * Webpack
  * Babel
  * ESLint
  * NodeJS Dev Server w/ Live Reloading
  
  More details on running and customizing your app can be found [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).
  
  Additionally, the following have been added support suport hackathon participants:
  * Apollo GraphQL client for React
  * React Material-UI
  
### Common Components and Styling
[React Material-UI](https://material-ui.com/) is used to quickly get started with a nice set of reusable UI components.  Usage of these 3rd-party components and styles is limited to the `src/components/Common` directory.

## Install

  1. Clone this repo
  2.  `npm install`
  
## Getting Started

### App configuration
Add the following to the `src/config.json`:
  * The URL to the GraphQL endpoint
  * An [Authenticated User Session ID](#obtaining-a-session-id)
### Obtaining a session ID
  1. Using Chrome, log into HomeAway as an partner/owner using your normal credentials.
  2. While successfully logged into HomeAway.com, open the Chrome developer tools with the HomeAway web page as your active tab in Chome.
  3. In the dev tools window that opens, navigate to the `Application` tab
  4. Under `Storage`, expand `Cookies` and find the cookies for `HomeAway.com`.  Locate a cookie named `HASESSIONV3`.  The value of this cookie will be your session ID. 
### Running the app
  1.  `npm start`
  2.  Navigate to `http://localhost:3000/demo`
  
## Using GraphQL
