import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

interface EditTaskModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (newText: string) => void;
  taskText: string;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  show,
  onClose,
  onSave,
  taskText,
}) => {
  const [editedText, setEditedText] = useState(taskText);

  useEffect(() => {
    setEditedText(taskText);
  }, [taskText]);

  const handleSave = () => {
    if (!editedText) {
      return Alert.alert("Tarefa vazia", "Informe o nome da tarefa.");
    }
    onSave(editedText);
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Editar Tarefa</Text>
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onClose}
            >
              <Feather name="x" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={handleSave}
            >
              <Feather name="check" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
