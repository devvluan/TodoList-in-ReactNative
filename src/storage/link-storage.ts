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
    const storage = await get();
    const updated = JSON.stringify([...storage, newList]);

    await AsyncStorage.setItem(LIST_STORAGE_KEY, updated);
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    const storage = await get();
    const updated = storage.filter((link) => link.id !== id);

    await AsyncStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

export const ListStorage = {
  get,
  save,
  remove,
};
