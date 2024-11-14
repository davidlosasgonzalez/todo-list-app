'use strict';

function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
}

export { formatDate };
