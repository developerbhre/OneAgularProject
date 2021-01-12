
Angular project with login and post login page showing the employee details

Pre-requisites-
1.Angular version - 10.1.7
2.Node 13.14.0

In case of errors run the below commands to re-compile it,

Verify the installations with
ng --version

npm install --save-dev @angular-devkit/build-angular

In order to update the angular-cli package installed globally in your system, you need to run:

npm uninstall -g @angular-cli
npm install -g @angular/cli@latest

Depending on your system, you may need to prefix the above commands with sudo.

Also, most likely you want to also update your local project version, because inside your project directory it will be selected with higher priority than the global one:

rm -rf node_modules
npm uninstall --save-dev @angular-cli
npm install --save-dev @angular/cli@latest
npm install



To start the application run the command

ng serve

The above command will open the application at http://localhost:4200/