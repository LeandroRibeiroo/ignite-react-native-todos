import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit.png';

interface ITaskItem {
  index: number;
  toggleTaskDone: (id: number) => void;
  item: Task;
  removeTask: (id: number) => void;
  editTask: (taskID: number, taskNewTitle: string) => void;
}

export function TaskItem({
  index,
  toggleTaskDone,
  item,
  removeTask,
  editTask,
}: ITaskItem) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => {
    setEdit(true);
  };

  const handleCancelEditing = () => {
    setTitle((prevState) => prevState);
    setEdit(false);
  };

  const handleSubmitEditing = () => {
    editTask(item.id, title);
    setEdit(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (edit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [edit]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={
              item.done
                ? styles.taskMarkerDone
                : styles.taskMarker
            }
          >
            {item.done && (
              <Icon name="check" size={12} color="#FFF" />
            )}
          </View>

          <TextInput
            value={title}
            onChangeText={setTitle}
            editable={edit}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={
              item.done
                ? styles.taskTextDone
                : styles.taskText
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {edit ? (
          <TouchableOpacity
            testID={`close-${index}`}
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divisor} />
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(item.id)}
          disabled={edit}
          style={{
            paddingHorizontal: 24,
            opacity: edit ? 0.2 : 1,
          }}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  divisor: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
