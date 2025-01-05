import React, { useCallback, useEffect, useState } from "react";
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
import { ListStorage } from "@/storage/link-storage";
import { useFocusEffect } from "expo-router";

export default function App() {
  type SelectedValue = "Criadas" | "Concluídas" | "";
  const [category, setCategory] = useState<SelectedValue>("");
  const [todoList, setTodoList] = useState<ListStorage[]>([]);
  const [todoLists, setTodoLists] = useState<ListStorage>({} as ListStorage);
  const [nameList, setNameList] = useState("");
  const [editTask, setEditTask] = useState(false);
  // const [filterIdList, setFilterIdList] = useState("");

  /**
   * Função para buscar todas as listas de tarefas no armazenamento e
   * preencher a lista de tarefas com as tarefas encontradas.
   * Se a categoria estiver selecionada, filtra as tarefas apenas para a
   * categoria selecionada.
   */
  async function getList() {
    try {
      const response = await ListStorage.get();

      const filtered = response.filter((list) =>
        category ? list.category === category : todoList
      );
      setTodoList(filtered);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as suas tarefas");
      console.log(error);
    }
  }

  /**
   * Função para lidar com os detalhes de uma lista de tarefas.
   * @param {ListStorage} selected - A lista de tarefas selecionada.
   */
  function handleDetails(selected: ListStorage) {
    setTodoLists(selected);
  }

  /**
   * Função para lidar com a inclusão de uma nova lista de tarefas.
   * Se o nome da lista estiver vazio, exibe um alerta solicitando o preenchimento do nome.
   * Se a inclusão for realizada com sucesso, exibe um alerta de sucesso e limpa o nome da lista.
   * Se ocorrer um erro, exibe um alerta de erro.
   */
  async function handleAdd() {
    try {
      if (!nameList.trim()) {
        return Alert.alert("Nome vazio", "Informe o nome da tarefa");
      }

      await ListStorage.save({
        id: new Date().getTime().toString(),
        name: nameList,
        category: "Criadas",
        completed: false,
      });
      setNameList("");
      getList();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a tarefa");
      console.log(error);
    }
  }

  /**
   * Função para remover uma lista de tarefas.
   *
   * @param {string} id - O id da lista de tarefas a ser removida.
   *
   * Se a remoção for realizada com sucesso, exibe um alerta de sucesso e
   * remove a lista de tarefas da lista de tarefas.
   * Se ocorrer um erro, exibe um alerta de erro.
   */
  async function listRemove(id: string) {
    try {
      await ListStorage.remove(id);
      setTodoList((prevState) => prevState.filter((item) => item.id !== id));
      getList();
      setEditTask(false);
      Alert.alert("Sucesso!", "Tarefa removida");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a tarefa");
      console.log(error);
    }
  }

  /**
   * Função para remover uma lista de tarefas.
   *
   * @param {string} id - O id da lista de tarefas a ser removida.
   * @param {string} name - O nome da lista de tarefas.
   *
   * Exibe um alerta solicitando confirmação de remoção da lista de tarefas.
   * Se a remoção for confirmada, chama a função listRemove para remover a lista de tarefas.
   * Se a remoção for cancelada, não faz nada.
   */
  const handleListRemove = (id: string, name: string) => {
    Alert.alert("Remover", `Remover a Tarefa ${name} da Lista?`, [
      {
        text: "Sim",
        onPress: () => listRemove(id),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
    getList();
  };

  /**
   * Função para alternar a categoria de uma lista de tarefas para "Criadas" ou "Concluídas".
   *
   * @param {ListStorage} todoLists - A lista de tarefas a ter a categoria alterada.
   *
   * Se a lista de tarefas tiver a categoria "Concluídas", altera para "Criadas" e vice-versa.
   * Chama a função ListStorage.completed para atualizar a lista de tarefas no armazenamento.
   * Se a atualização for bem sucedida, exibe um alerta de sucesso e atualiza a lista de tarefas.
   * Se ocorrer um erro, exibe um alerta de erro.
   */
  async function handleCategory(todoLists: ListStorage) {
    try {
      await ListStorage.completed(todoLists.id, {
        ...todoLists,
        category:
          todoLists.category === "Concluídas" ? "Criadas" : "Concluídas",
        completed: todoLists.completed ? false : true,
      });
      getList();
      Alert.alert("Sucesso", "Tarefa concluida com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a tarefa");
      console.log(error);
    }
  }

  /**
   * Função para lidar com a edição do nome de uma lista de tarefas.
   *
   * @param {string} newName - O novo nome da lista de tarefas.
   *
   * Se a edição for bem sucedida, exibe um alerta de sucesso e atualiza a lista de tarefas.
   * Se ocorrer um erro, exibe um alerta de erro.
   */
  async function handleEditTaskName(newName: string) {
    try {
      await ListStorage.edit(todoLists.id, { ...todoLists, name: newName });
      getList();
      Alert.alert("Sucesso", "Tarefa editada com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível editar a tarefa");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getList();
    }, [category])
  );

  return (
    <>
      <View style={styles.container}>
        <EditTaskModal
          onClose={() => setEditTask(false)}
          show={editTask}
          onSave={handleEditTaskName}
          taskText={todoLists.name}
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
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Feather name="plus-circle" size={16} color={colors.gray[100]} />
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TouchableOpacity
                onPress={() =>
                  setCategory((prevState) =>
                    prevState === "Criadas" ? "" : "Criadas"
                  )
                }
              >
                <Text
                  style={[
                    styles.statLabel,
                    category === "Criadas"
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
                  setCategory((prevState) =>
                    prevState === "Concluídas" ? "" : "Concluídas"
                  )
                }
              >
                <Text
                  style={[
                    styles.statLabel,
                    category === "Concluídas"
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
            data={todoList
              .filter((t) => (category ? t.category === category : todoList))
              .toReversed()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoList
                key={item.name}
                name={item.name}
                completed={item.completed}
                idList={() => handleDetails(item)}
                onEdit={() => setEditTask(true)}
                onToggle={() => handleCategory(item)}
                onRemove={() => handleListRemove(item.id, item.name)}
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
