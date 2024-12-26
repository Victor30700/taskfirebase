import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import '../styles/EditPage.css';


const EditPage = () => {
  const [tasks, setTasks] = useState([]); // Todas las tareas (pendientes y completadas)
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Obtener tareas desde Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksSnapshot = await getDocs(collection(db, 'tasks'));
      setTasks(tasksSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchTasks();
  }, []);

  // Agregar nueva tarea (estado inicial: pendiente)
  const handleAddTask = async (task) => {
    const newTask = { ...task, completed: false, startDate: new Date().toISOString() };
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    setTasks((prev) => [...prev, { ...newTask, id: docRef.id }]);
  };

  // Editar tarea existente
  const handleEditTask = async (id, updatedTask) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    setTaskToEdit(null);
  };

  // Eliminar tarea
  const handleDeleteTask = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      const taskRef = doc(db, 'tasks', id);
      await deleteDoc(taskRef);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };
  const handleCompleteTask = async (id) => {
    const now = new Date().toISOString(); // Fecha y hora actual
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { completed: true, endDate: now }); // Actualiza en Firebase
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: true, endDate: now } // Actualiza estado local
          : task
      )
    );
  };
  

  return (
    <div className="edit-page">
      <h2>Editar Tareas</h2>
      {taskToEdit ? (
        <TaskForm
          existingTask={taskToEdit}
          onSubmit={(updatedTask) => handleEditTask(taskToEdit.id, updatedTask)}
          onCancel={() => setTaskToEdit(null)}
        />
      ) : (
        <TaskForm onSubmit={handleAddTask} />
      )}
      {/* Muestra todas las tareas para gestionar en esta página */}
      <TaskList
        tasks={tasks}
        onEdit={(task) => setTaskToEdit(task)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default EditPage;
