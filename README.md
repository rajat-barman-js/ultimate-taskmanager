Ultimate Task Manager

Overview
Built on React and Redux, the Ultimate Task Manager is a task management application that allows users to perform operations such as adding, editing, deleting and marking tasks as complete. Apart from that it includes features like sorting functionality, filtering functionality and search functionality to help you manage your tasks effectively.

External Dependencies
The project uses the following external dependencies:

React: A JavaScript library for building user interfaces.
Redux: A predictable state container for JavaScript apps.
react-redux: Official React bindings for Redux.

Installation

1. Clone the Repository:
   git clone https://github.com/rajat-barman-js/ultimate-taskmanager.git
   cd ultimate-taskmanager
2. Install Dependencies:
   Make sure you have Node.js and npm installed.
   Then, run: npm install
3. Start the Application:
   npm start

Project Structure

ultimate-taskmanager/
├── node_modules/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── TaskForm.js
│ │ ├── TaskForm.css
│ │ ├── TaskItem.js
│ │ ├── TaskItem.css
│ │ ├── TaskList.js
│ │ ├── TaskList.css
│ ├── constants/
│ │ ├── common-constants.js
│ │ ├── enum.js
│ ├── redux/
│ │ ├── task-actions.js
│ │ ├── task-reducers.js
│ │ ├── store.js
│ │ ├── custom-middleware.js
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
├── .gitignore
├── package.json
└── README.md

Components of the project

1.TaskForm Component:

Located at src/components/TaskForm.jsx and styled with src/components/TaskForm.css.

Can add or edit a task. It has title, description, priority and due date fields to accommodate these functionalities.

2. TaskItem Component:

Located at src/components/TaskItem.jsx and styled with src/components/TaskItem.css.

Displays single tasks and allows them to be deleted, edited and toggle complete/incomplete.
The delete function is represented by a "Delete" button while the complete function is represented by a "Mark as complete button", which can be toggled to icomplete by clicking on the "Mark as Incomplete" button. Task can be edited by clicking on the edit button and saving changes on the Edit Task form.

3. TaskList Component:

Located at src/components/TaskList.jsx and styled with src/components/TaskList.css.

Contains list of task, sort controls and search criteria that can filter out tasks based on specific conditions set for it including searching mechanism

4. Redux Store:

The tasks actions are defined in src/redux/task-actions.js.

In its turn, the reducer to handle tasks state change is saved in src/redux/task-reducer.js. As far as Redux store configuration process is concerned, it can be found in src/redux/store.js.

5. Main App Component:

Located at src/App.js and styled with src/App.css.

It combines TaskForm and TaskList to give the main interface of this application. The main page displays all tasks available in todo-list format which appears below when “Add new task” button gets clicked

6. Entry Point:

The entry point of the application is source/index.js file where it renders the App component inside the root div of public/index.html.

Notes:

1. The application keeps the tasks in the local storage of the browser, meaning that even after closing, it retains them.

2. The app has a way of ordering tasks based on either priority or due date. It can be done both from sort dropdown.

3. Users are able to filter completed or uncompleted tasks.

4. Additionally, users can search for any task by its name or description.

Future Improvements:

1. Integration with a backend service.

2. More choices in terms of customization for sorting and filtering tasks should be added.

This document is meant to help you understand how to set up and use Ultimate Task Manager on your local machine. It will show you the directory structure, dependencies, and components of the project in a way that makes it easy for developers to understand.
