import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

type Props = {
  name: string;
  completed: boolean;
  onEdit: (edit: boolean) => void;
  idList: () => void;
  onToggle: () => void;
  onRemove: () => void;
};

export function TodoList({
  name,
  onRemove,
  onToggle,
  idList,
  completed,
  onEdit,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        {completed ? (
          <Feather name="check-circle" size={24} color={colors.purple.light} />
        ) : (
          <Feather name="circle" size={24} color={colors.blue.light} />
        )}
      </TouchableOpacity>
      <Text
        onPress={() => {
          idList();
          onEdit(true);
        }}
        style={[styles.text, completed && styles.completedText]}
      >
        {name}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Feather name="trash-2" size={20} color={colors.gray[300]} />
      </TouchableOpacity>
    </View>
  );
}
