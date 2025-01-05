import AsyncStorage from "@react-native-async-storage/async-storage";

const LIST_STORAGE_KEY = "links-storage";

export type ListStorage = {
  id: string;
  name: string;
  completed: boolean;
  category: string;
};

async function get(): Promise<ListStorage[]> {
  const storage = await AsyncStorage.getItem(LIST_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : [];

  return response;
}

async function save(newList: ListStorage) {
  try {
    if (!newList) {
      throw new Error("Lista invalida");
    }
    const storage = await get();
    const updated = JSON.stringify([...storage, newList]);

    await AsyncStorage.setItem(LIST_STORAGE_KEY, updated);
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    if (!id) {
      throw new Error("Lista não encontrada");
    }
    const storage = await get();
    const updated = storage.filter((list) => list.id !== id);

    await AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

async function edit(id: string, newName: ListStorage) {
  try {
    if (!id) {
      throw new Error("Lista não encontrada");
    }
    const storage = await get();
    const updated = storage.map((list) => {
      if (list.id === id) {
        return { ...list, ...newName };
      }
      return list;
    });

    await AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

async function completed(id: string, newStatus: ListStorage) {
  try {
    const storage = await get();
    const updated = storage.map((list) => {
      if (!id) {
        throw new Error("Lista não encontrada");
      }
      if (list.id === id) {
        return { ...list, ...newStatus };
      }
      return list;
    });

    await AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    throw error;
  }
}

export const ListStorage = {
  get,
  save,
  remove,
  edit,
  completed,
};
