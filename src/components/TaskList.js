import React from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  // Función para formatear la fecha
  const formatDate = (isoString) => {
    if (!isoString) return 'Sin fecha'; // Manejo de fecha nula o indefinida
    const date = new Date(isoString);
    return date.toLocaleString(); // Formato de fecha según la configuración local
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.priority ? 'important' : ''} ${
            task.completed ? 'completed' : ''
          }`}
        >
          <div>
            {/* Título tachado si la tarea está completada */}
            <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </h3>
            <p>{task.description}</p>
            {/* Mostrar la fecha de inicio */}
            <p>{`Fecha de inicio: ${formatDate(task.startDate)}`}</p>
            {/* Mostrar la fecha de fin solo si está completada */}
            {task.completed && (
              <p>{`Fecha de fin: ${formatDate(task.endDate)}`}</p>
            )}
          </div>
          <div className="task-actions">
            {/* Botón "Completar" solo si la tarea no está completada */}
            {onComplete && !task.completed && (
              <button onClick={() => onComplete(task.id)}>Completar</button>
            )}
            {/* Mostrar indicador de tarea completada */}
            {task.completed && <span className="completed-label">✔ Completada</span>}
            {/* Botón para editar */}
            {onEdit && <button onClick={() => onEdit(task)}>Editar</button>}
            {/* Botón para eliminar */}
            {onDelete && <button onClick={() => onDelete(task.id)}>Eliminar</button>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
