import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if(text.trim()!==""){
        setTasks([...tasks, { id: tasks.length + 1, text: text, done: false }]);
    setText("");
    console.log(Platform.OS)
    }
  
  };
  const updateTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO APP</Text>
      <TextInput
        style={styles.inp}
        placeholder="add task here"
        type="text"
        onChangeText={setText}
        value={text}
      />
      <Button
        onPress={addTask}
        title="Add Task"
        color={Platform.OS==="web"?"#342876":"#841584"}
        accessibilityLabel="Learn more about this purple button"
      />
     
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return (
            <ScrollView key={item.id}  >
            <TouchableOpacity onPress={() => updateTask(item.id)}>
              <View style={item.done ? styles.done : styles.task}>
                <Text>{item.text}</Text>
              </View>
            </TouchableOpacity>
            </ScrollView>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  heading:{
    fontSize:30,
    color:"purle",
    fontFamily:'Josefin Sans, sans-serif',
    
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  inp: {
    borderBottomColor: "green",
    padding: 10,
    width: 200,
    borderWidth: 2,
    fontSize: 20,
    borderRadius:20,
    marginBottom:1
  },
  done: {
    backgroundColor: "lightgreen",
    borderBottomColor: "black",
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    margin: 5,
    width:Platform.OS==="web"?650:250,
  },
  task: {
    borderBottomColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: Platform.OS==="web"?650:250,
  },
});
