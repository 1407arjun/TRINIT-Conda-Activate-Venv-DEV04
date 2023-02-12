<h1 align="center">Clusterbase</h1>

## <img src="https://openclipart.org/download/307315/1538154643.svg" width="32" height="32"> About the project
Clusterbase is a system that is easily configurable on the number and type of parameters and clustering rules, where in the clustering happens in real time with the values dynamically provided by the user. The Web application provides an user with a console to add a new cluster along with options to view and query all the active clusters. Each cluster page consists of a configuration page where user can setup the rules, configurations and query variables to view clusters in real time, 


## <img src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" width="32" height="32"> Getting Started
To get a local copy up and running follow these simple steps.
### Prerequisites
In order to get a copy of the project you will require you to have Node.js (v14+) and the NPM package manager installed. If you don't have it, you can download the latest version of Node.js from the [official website](https://nodejs.org/en/download/) which also installs the NPM package manager by default.
### Installation
Open the terminal in the folder in which you wish to clone the repository and enter the following command:
``` 
git clone https://github.com/1407arjun/TRINIT-Conda-Activate-Venv-DEV04.git
cd <to-folder>
```
Install all the NPM packages:
```
npm i
```
In order to run the project in development mode use:
```
npm run dev
```
In order to build the project and run, use:
```
npm run build
npm start
```

### Flask Server Setup
Open the terminal in the folder in which you wish to clone the repository and enter the following command:
``` 
cd server
```
Install all the python packages:
```
conda install --file requirements.txt
```
In order to run the project, export the flask app as app:
```
EXPORT FLASK_APP=app
```
In order to start the flask server, use:
```
flask run
```

## Presentation Link 

[Presentation.pdf](https://github.com/1407arjun/TRINIT-Conda-Activate-Venv-DEV04/files/10715125/Presentation.pdf)



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
