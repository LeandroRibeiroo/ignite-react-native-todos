import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert('Essa task já existe na lista.');
      setTasks(tasks);
    } else {
      setTasks((prevState) => [...prevState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    updatedTasks.find((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });

    setTasks(updatedTasks);
  }

  function handleEditTask(
    taskID: number,
    taskNewTitle: string
  ) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    updatedTasks.find((task) => {
      if (task.id === taskID) {
        task.title = taskNewTitle;
      }
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const newList = tasks.filter(
              (task) => task.id !== id
            );
            setTasks(newList);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
