[![Netlify Status](https://api.netlify.com/api/v1/badges/d72a4443-c0c1-45c6-84c5-38e71d5be520/deploy-status)](https://app.netlify.com/sites/uga-gta-kinview/deploys)

# GTA-Tree-kinview
This project is a combination of the [GTA-tree](https://github.com/amitabhpriyadarshi/GTA-Tree/), and [KinView](https://github.com/prokino/kinview/).
The GTA-tree is in the `web` directory, and the merged application resides in the `web-react`.

## Configurations
To change lables, and visibility of the controls, you may edit the `web-react/src/gta.settings.json` file.

## Running the Project Locally
### Server (KinView part)

1. `cd web-react`
2. `npm start` (it starts the server on http://localhost:3000, you can change the port in the `web-react/src/package.json` file).

### Client (GTA-tree part)
1. `cd web`

   If the local server is running on an address except http://localhost:3000, 
   1. Edit the `src` property value in the following line in `index.html`: 


      `<iframe id="react_frame" src="http://localhost:3000/" width="550" height="550" frameborder="0" scrolling="yes" style="width: 100%">`
   2. Edit the `SERVER_ADDRESS` variable value in `web/src/JS/index.js`


2. To run the client on your local machine. You need to config a local server, or install an npm package that runs a website. 
For example:
`npm install -g serve `

3. Start the project on a local server. For example, if server is installed, the following command starts the server locally on port 5000:

   `serve -s .`

