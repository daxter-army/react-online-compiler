# CodePlay - online programming language compiler

<p align="center">
  <a href="https://github.com/daxter-army/react-online-compiler/">
    <img src="./readme-data/logo.svg" alt="Logo" width="50">
  </a>

  <h3 align="center">CodePlay</h3>

  <p align="center">
    Online python compiler
    <br />
    <a href="https://playcodeonline.herokuapp.com/"><strong>Project Homepage »</strong></a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## 🌠 Functionalities
* **No API is being used, it runs the python code as the child process of node.js and then returns back the compiler result.**

### 🛠 Built With
This was achieved with **ExpressJS**, (NodeJS) working as a backend server, **ReactJS** as frontend, & **Python** for compiling python code.

- [NodeJS](https://nodejs.org)
- [ReactJS](https://reactjs.org)
- [ExpressJS](https://expressjs.com/)
- [Python](https://python.org)

<!-- GETTING STARTED -->

## 🚲 Getting Started (Development)

This section will help you to get started with the project, locally

## 🗜 Prerequistes

- NodeJS version > 10 should be installed on your system

### 🐱‍🏍 Installation

- Clone the project locally with

```sh
    git clone git@github.com:daxter-army/react-online-compiler.git
```

- Navigate to the project dir and first in the directory run
```sh
    npm install
```

- and then run
```sh
    npm run dev
```
* This will startup your nodejs backend dev server at http://localhost:5000/
* Then navigate to client directory and there run

```sh
    npm install
    npm run start
```

- Now go to **http://localhost:3000/**, to see your reactjs frontend application

## ℹ Info

* The compiler only supports non-user-interactive code for now.