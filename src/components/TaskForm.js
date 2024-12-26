// components/TaskForm.js
import React, { useState } from 'react';
import '../styles/TaskForm.css';
import '../styles/TaskList.css';

const TaskForm = ({ onSubmit, existingTask, onCancel }) => {
    const [task, setTask] = useState(
      existingTask || { title: '', description: '', priority: false }
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!task.title) {
        alert('El título es obligatorio');
        return;
      }
      onSubmit(task);
      if (!existingTask) {
        setTask({ title: '', description: '', priority: false });
      }
    };
  
    return (
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>{existingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
        <input
          type="text"
          placeholder="Título"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.checked })}
          />
          Importante
        </label>

        <div className="form-buttons">
          <button id="myButton" type="submit">{existingTask ? 'Actualizar' : 'Agregar'}</button>
          {existingTask && <button type="button" onClick={onCancel}>Cancelar</button>}
        </div>
      </form>
    );
  };
  
  export default TaskForm;
  