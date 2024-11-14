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
 * ##############################
 * ##  Enviar una nueva tarea  ##
 * ##############################
 *
 * Agregamos una función manejadora al evento submit del formulario que se
 * encargue de agregar una nueva tarea con los datos que el usuario introdujo
 * en el input.
 *
 */

todoForm.addEventListener('submit', (e) => {
    // Prevenimos el comportamiento por defecto del formulario.
    e.preventDefault();

    // Creamos el <li>.
    const li = document.createElement('li');

    // Agregamos el contenido.
    li.innerHTML = `
        <input type="checkbox" />
        <p>${todoTextInput.value}</p>
        <time>${formatDate(new Date())}</time>
    `;

    // Agregamos el elemento a la lista.
    todoListUl.prepend(li);

    // Vaciamos el input.
    todoTextInput.value = '';
});

/**
 * ####################################################
 * ##  Marcar tarea como completada / no completada  ##
 * ####################################################
 *
 * Agrega un evento al ul que marque una tarea como completada o
 * no completada.
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

        // Agregamos o eliminamos la clase "done".
        closestLi.classList.toggle('done');
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
 */

cleanBtn.addEventListener('click', () => {
    if (
        confirm(
            '¿Deseas eliminar las tareas marcadas como completadas? Esta acción es irreversible.'
        )
    ) {
        // Obtenemos todas las tareas completadas (las tareas son <li>).
        const taskDoneLis = document.querySelectorAll('li.done');

        // Recorremos el array de tareas completadas.
        for (const value of taskDoneLis) {
            // Eliminamos el elemento.
            value.remove();
        }
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
 */

emptyBtn.addEventListener('click', () => {
    if (
        confirm(
            '¿Deseas eliminar todas las tareas? Esta acción es irreversible.'
        )
    ) {
        // Vaciamos el contenido del <ul>.
        todoListUl.innerHTML = '';
    }
});
