# TrackCLI

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

A simple Command Line Interface (CLI) for managing tasks. You can add, delete, and list tasks based on their status (e.g., done, in-progress). This project is built in Node.js without any additional libraries (other than uuid for unique task IDs).

## Table of Contents
- Prerequisites
- Installation
- Usage
- Commands
- Add a Task
- Delete a Task
- Update a Task
- List Tasks by Status
- List All Tasks
- Code Explanation

## Installation
**Clone the Repository**

   ```bash
   git clone https://github.com/MarioGhost25/TrackCLI.git

   # Navigate to the project Directory
   cd TrackCLI/

   # Install the required dependencies:
   npm install uuid

   # Run the code
   node index.mjs <command> [arguments]
   ```

## Usage
The CLI accepts commands through the terminal to perform different actions on tasks.

## Commands
- **Add a Task**
```bash
node index.js add "Drink a Coffee"
```

- **List all Tasks**
```bash
node index.js list
```
- **or by list the tasks by status**
```bash
# To list the tasks that are marked as to-do
node index.js list not-done

# To list the tasks that are marked as in-progess
node index.js list in-progress

# To list the tasks that are marked as done
node index.js list done
```

- **Update a Task**
```bash
node index.js update 1 "Drink a Coffee and Do Coding"
```
- **Delete a Task**
```bash
# Delete the task by containing its ID 1
node index.js delete 1
```
### Sample JSON structure
```JSON
[
  {
    "id": "unique-task-id",
    "description": "Your task description",
    "status": "in-progress",  // Status can be 'done', 'in-progress', or 'not-done'
    "createdAt": "ISO date format",
    "updatedAt": "ISO date format"
  }
]
```
