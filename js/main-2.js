'use strict';

// Importamos la función que formatea una fecha.
import { formatDate } from './helpers.js';

// Seleccionamos todos los nodos con los que vamos a trabajar.
const cleanBtn = document.querySelector('button.todo-clean');
const emptyBtn = document.querySelector('button.todo-empty');
const todoForm = document.querySelector('form.todo-form');
const todoListUl = document.querySelector('ul.todo-list');
const todoTextInput = todoForm.elements.todo;

/**
 * ####################
 * ##  LocalStorage  ##
 * ####################
 *
 * Obtenemos las tareas almacenadas en el Local Storage (si las hay).
 *
 */

const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));

/**
 * #######################
 * ##  Array de tareas  ##
 * #######################
 *
 * Si localStorageTasks tiene un array de tareas nos quedamos con ese array, de lo
 * contrario inicializamos a un array vacío.
 *
 * Cada tarea es un objeto con las propiedades:
 *
 *      - text: el texto de la tarea
 *      - date: la fecha en la que fue creada la tarea en formato ISO.
 *      - done: indica si la tarea está marcada como completada o no. Por defecto false.
 *
 */

let tasks = localStorageTasks || [];

/**
 * ##############################
 * ##  Enviar una nueva tarea  ##
 * ##############################
 *
 * Agregamos una función manejadora al evento submit del formulario que se
 * encargue de agregar una nueva tarea con los datos que el usuario introdujo
 * en el input.
 *
 * Renderizamos nuevamente el array de tareas para que aparezca la nueva tarea.
 *
 */

todoForm.addEventListener('submit', (e) => {
    // Prevenimos el comportamiento por defecto del formulario.
    e.preventDefault();

    // Pusheamos la nueva tarea al array de tareas.
    tasks.push({
        text: todoTextInput.value,
        date: new Date(),
        done: false,
    });

    // Actualizamos el array de tareas en el Local Storage.
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Vaciamos el input.
    todoTextInput.value = '';

    // Renderizamos.
    render();
});

/**
 * ####################################################
 * ##  Marcar tarea como completada / no completada  ##
 * ####################################################
 *
 * Agrega un evento al ul que marque una tarea como completada o
 * no completada.
 *
 * Renderizamos nuevamente el array de tareas para que la tarea se
 * marque como completada o se desmarque.
 *
 */

todoListUl.addEventListener('click', (e) => {
    // Obtenemos por destructuring el elemento exacto sobre el que hicimos click.
    const { target } = e;

    // Si el elemento clickado coincide exactamente con el input agregamos o eliminamos
    // la clase "done".
    if (target.matches('input[type="checkbox"]')) {
        // Localizamos el <li> más cercano.
        const closestLi = target.closest('li');

        // Obtenemos el index de la tarea del atributo personalizado que hemos agregado
        // en la función render.
        const index = closestLi.getAttribute('data-index');

        // Seleccionamos la tarea que corresponda en el array de tareas.
        const currentTask = tasks[index];

        // Invertimos el valor de la propiedad "done".
        currentTask.done = !currentTask.done;

        // Actualizamos el array de tareas en el Local Storage para que figure el cambio.
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Renderizamos.
        render();
    }
});

/**
 * #################################################
 * ##  Eliminar tareas marcadas como completadas  ##
 * #################################################
 *
 * Agrega un evento de click al botón que se encarga de limpiar
 * las tareas marcadas como completadas para eliminar estas tareas.
 *
 * Renderizamos nuevamente el array de tareas para que desaparezcan
 * las marcadas como completadas.
 *
 */

cleanBtn.addEventListener('click', () => {
    if (
        confirm(
            '¿Deseas eliminar las tareas marcadas como completadas? Esta acción es irreversible.'
        )
    ) {
        // Eliminamos las tareas marcadas como completadas del array de tareas.
        tasks = tasks.filter((value) => !value.done);

        // Actualizamos el array de tareas en el Local Storage para que figure el cambio.
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Renderizamos.
        render();
    }
});

/**
 * ################################
 * ##  Eliminar todas las tareas ##
 * ################################
 *
 * Agrega un evento de click al botón que se encarga de eliminar
 * todas las tareas.
 *
 * Renderizamos nuevamente el array de tareas para desaparezcan todas
 * las tareas.
 *
 */

emptyBtn.addEventListener('click', () => {
    if (
        confirm(
            '¿Deseas eliminar todas las tareas? Esta acción es irreversible.'
        )
    ) {
        // Vaciamos el contenido del array de tareas.
        tasks = [];

        // Actualizamos el array de tareas en el Local Storage para que figure el cambio.
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Renderizamos.
        render();
    }
});

/**
 * #####################################
 * ##  Actualizar la lista de tareas  ##
 * #####################################
 *
 * Crea la función render que se encargará de actualizar las tareas
 * en el HTML cada vez que hagamos un cambio.
 *
 */

const render = () => {
    // Vaciamos el contenido del <ul>
    todoListUl.innerHTML = '';

    // Creamos un fragmento de documento.
    const frag = document.createDocumentFragment();

    // Recorremos el array de tareas.
    for (let i = 0; i < tasks.length; i++) {
        // Creamos el <li>.
        const li = document.createElement('li');

        // Creamos un atributo personalizado para almacenar la posición (index)
        // de cada tarea.
        li.setAttribute('data-index', i);

        // Añadimos la clase "done" si es necesaria.
        li.classList.add(tasks[i].done && 'done');

        // Agregamos el contenido.
        li.innerHTML = `
            <input type="checkbox" ${tasks[i].done && 'checked'} />
            <p>${tasks[i].text}</p>
            <time>${formatDate(tasks[i].date)}</time>
        `;

        // Agregamos el elemento de lista al fragmento.
        frag.prepend(li);
    }

    // Agregamos el fragmento a la lista de tareas.
    todoListUl.append(frag);
};

// Llamamos a la función render nada más ejecutar el código por si hay tareas en el
// Local Storage y es necesario renderizarlas.
render();
