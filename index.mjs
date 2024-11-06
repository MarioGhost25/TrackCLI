import fs, { copyFile, unlink } from 'node:fs/promises'
import { json } from 'stream/consumers';
import { v4 as uuidv4 } from 'uuid'
import pc from 'picocolors'

const filePath = './task.json'; //conexion to the json file 
const copyPath = './archivo.json';

//Method to read tasks
async function readTasks() {
    try {
        // Verify if the file exist using fs.access
        await fs.access(filePath);
    } catch (error) {
        // If the file doesn't exist, create it with an empty array
        await fs.writeFile(filePath, JSON.stringify([]));
    }   

    try {
        // Reading the file and to parse its content
        const data = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : []; // If the file is empty, return it an empty array
    } catch (error) {
        console.error("Error to read or to parse tasks:", error);
    }
}


//method to save data 
async function saveTasks(tasks) {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

//this method is to append the data in a file
async function addTask(description) {
    try {
        // Leer tareas existentes
        const tasks = await readTasks();
        // Crear una nueva tarea con los datos proporcionados
        const newTask = {
            id: uuidv4(),
            description,
            status: 'not-done',               // Estado inicial
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        // Agregar la nueva tarea a la lista
        tasks.push(newTask);
        // Guardar las tareas actualizadas en el archivo
        await saveTasks(tasks);
        console.log(`Task added : ${pc.greenBright(description)}`);
    } catch (error) {
        console.error('Error to add the task:', error);
    }
}

//method to update the 
async function updateTaskStatus(id, newStatus) {
    try{
        const tasks = await readTasks();
        const task = tasks.find(task => task.id === id);
        if (task) {
        task.status = newStatus;
        task.updatedAt = new Date().toISOString();
        await saveTasks(tasks);
        console.log(pc.yellow(`Task's state updated to: ${newStatus}`));
        } else {
        console.log(pc.red(`Task with id ${id} not found`));
      }
    }catch(error){
        console.error('Error to update the task:', error);
    }
    
}

//method to delete data 
async function deleteTask(id) {
    try {
        const tasks = await readTasks(); //we read all the file
        const updatedTasks = tasks.filter(task => task.id !== id);

        // Guardar el array actualizado de tareas en el archivo
        await saveTasks(updatedTasks);
        
        console.log(pc.gray(`Task with id ${id} deleted.`));

    }
    catch(error){
        console.error('Error to find the task:', error);
    }
    
}
//method to list done tasks
async function listTasks(status) {
    try{
        const tasks = await readTasks();
        let filteredTasks = tasks
        status = status.toLowerCase();

         switch (status) {
            case "done":
                filteredTasks = tasks.filter(task => task.status === "done")
                console.log(filteredTasks)
                break;
            case "in-progress":
                filteredTasks = tasks.filter(task => task.status === "in-progress")
                console.log(filteredTasks)
                break;
            case "not-done":
                filteredTasks = tasks.filter(task => task.status === "not-done")
                console.log(filteredTasks)
                break;
            case "":
                filteredTasks.length === 0 ? 
                console.log(pc.magenta("We recommend you to add some tasks")): 
                filteredTasks.forEach(task => {
                    console.log(`${task.id}. ${task.description} [${task.completed ? pc.green + "Done" : task.inProgress ? pc.yellow + "In-progress" : pc.red + "To-do"}`);
                });
            default:
               console.log(pc.whiteBright("Invalidated Status, Use 'done', 'not-done' or 'in-progress'"))
         }
         
    }
    catch(error){
        console.error('Error to find tasks :', error);
    }
}



//listTasks('')
//updateTaskStatus("888b6c4f-b831-407c-baa6-fcdd12051922", "not-done")
//deleteTask("cd65daa7-4d59-4f08-a0eb-b0ceab536b97")
/*readTasks()
    .then(tasks => console.log(tasks))
    .catch(error => console.error('Error al leer las tareas:', error));*/

//addTask('aprendiendo nodes')


