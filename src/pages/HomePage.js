import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import TaskList from '../components/TaskList';
import '../styles/HomePage.css';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  // Obtener tareas desde Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksSnapshot = await getDocs(collection(db, 'tasks'));
      setTasks(tasksSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchTasks();
  }, []);

  // Completar tarea: actualiza estado local y Firebase
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
    <div className="home-page">
      <h2>Tareas Pendientes</h2>
      {/* Mostrar tareas pendientes */}
      <TaskList
        tasks={tasks.filter((task) => !task.completed)}
        onComplete={handleCompleteTask}
      />

      <h2>Tareas Completadas</h2>
      {/* Mostrar tareas completadas */}
      <TaskList tasks={tasks.filter((task) => task.completed)} />
    </div>
  );
};

export default HomePage;
