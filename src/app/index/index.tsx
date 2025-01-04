import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { styles } from "./styles";
import { TodoList } from "@/components/TodoList";
import { EditTaskModal } from "@/components/EditTask";

interface Todo {
  id: string;
  name: string;
  category: string;
  completed: boolean;
}

export default function App() {
  type SelectedValue = "Criadas" | "Concluídas" | "";
  const [selected, setSelected] = useState<SelectedValue>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [nameList, setNameList] = useState("");
  const [editTask, setEditTask] = useState(false);
  const [filterIdList, setFilterIdList] = useState("");
  const handleListAdd = () => {
    if (!nameList) {
      return Alert.alert("Tarefa vazia", "Informe o nome da tarefa.");
    }
    setTodoList((prevState) => [
      ...prevState,
      {
        name: nameList,
        category: "Criadas",
        id: String(Math.random()).substring(2, 4),
        completed: false,
      },
    ]);
    setNameList("");
    return Alert.alert("Sucesso", "Tarefa adicionada");
  };

  const handleListRemove = (name: string) => {
    Alert.alert("Remover", `Remover a Tarefa ${name} da Lista?`, [
      {
        text: "Sim",
        onPress: () => {
          setTodoList((prevState) =>
            prevState.filter((todoList) => todoList.name !== name)
          );
          Alert.alert("Sucesso!", "Tarefa removida");
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  };

  const handleCategory = (id: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              category: todo.completed ? "Criadas" : "Concluídas",
            }
          : todo
      )
    );
  };

  const handleEditTaskName = (newName: string) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === filterIdList ? { ...todo, name: newName } : todo
      )
    );
  };

  return (
    <>
      <View style={styles.container}>
        <EditTaskModal
          onClose={() => setEditTask(false)}
          show={editTask}
          onSave={handleEditTaskName}
          taskText={todoList.filter((t) => t.id === filterIdList)[0]?.name}
        />
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View style={styles.header}>
          <Feather name="database" size={24} color={colors.blue.light} />
          <Text style={styles.toTitle}>to</Text>
          <Text style={styles.doTitle}>do</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Adicione uma nova tarefa"
              placeholderTextColor={colors.gray[300]}
              onChangeText={setNameList}
              value={nameList}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleListAdd}>
              <Feather name="plus-circle" size={16} color={colors.gray[100]} />
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TouchableOpacity
                onPress={() =>
                  setSelected((prevState) =>
                    prevState === "Criadas" ? "" : "Criadas"
                  )
                }
              >
                <Text
                  style={[
                    styles.statLabel,
                    selected === "Criadas"
                      ? { color: colors.purple.light }
                      : { color: colors.blue.light },
                  ]}
                >
                  Criadas
                </Text>
              </TouchableOpacity>
              <View style={styles.statBadge}>
                <Text style={styles.statValue}>
                  {todoList.filter((t) => t.category === "Criadas").length}
                </Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <TouchableOpacity
                onPress={() =>
                  setSelected((prevState) =>
                    prevState === "Concluídas" ? "" : "Concluídas"
                  )
                }
              >
                <Text
                  style={[
                    styles.statLabel,
                    selected === "Concluídas"
                      ? { color: colors.purple.light }
                      : { color: colors.blue.light },
                  ]}
                >
                  Concluídas
                </Text>
              </TouchableOpacity>
              <View style={styles.statBadge}>
                <Text style={styles.statValue}>
                  {todoList.filter((t) => t.category === "Concluídas").length}
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            data={todoList.filter((t) =>
              selected ? t.category === selected : todoList
            )}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TodoList
                key={item.name}
                name={item.name}
                completed={item.completed}
                idList={() => setFilterIdList(item.id)}
                onEdit={() => setEditTask(true)}
                onToggle={() => handleCategory(item.id)}
                onRemove={() => handleListRemove(item.name)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <>
                <View style={styles.emptyContainer}>
                  <Feather
                    name="clipboard"
                    size={56}
                    color={colors.gray[400]}
                  />
                  <Text style={styles.emptyTextBold}>
                    Você ainda não tem tarefas cadastradas
                  </Text>
                  <Text style={styles.emptyText}>
                    Crie tarefas e organize seus itens a fazer
                  </Text>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </>
  );
}
