import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";

const GEMINI_API_KEY = "";

const ChatScreen = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    if (!msg.trim()) return;

    const userMessage = { text: msg, sender: "user" };
    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    setMsg("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: msg,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      const geminiMessage = { text: reply, sender: "gemini" };
      setMessages((prevMessages) => [geminiMessage, ...prevMessages]);
    } catch (error) {
      const errorMessage = {
        text: "Error occurred while fetching response.",
        sender: "gemini",
      };
      setMessages((prevMessages) => [errorMessage, ...prevMessages]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === "user" ? styles.userRow : styles.geminiRow,
      ]}
    >
      {item.sender === "gemini" && (
        <Image
          source={require("../../assets/robot.png")} // replace with your Gemini bot icon
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.message,
          item.sender === "user" ? styles.userMessage : styles.geminiMessage,
        ]}
      >
        <Text
          style={
            item.sender === "user"
              ? styles.userMessageText
              : styles.geminiMessageText
          }
        >
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        
        <Image
          source={require("../../assets/robot.png")} // replace with your avatar
          style={styles.appAvatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.appTitle}>ChatGPT</Text>
          <Text style={styles.onlineStatus}>● Online</Text>
        </View>
        
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />

      {/* Input Field */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Write your message"
          placeholderTextColor="#888"
          value={msg}
          onChangeText={setMsg}
        />
        <TouchableOpacity
          style={[styles.sendButton, !msg.trim() && { opacity: 0.5 }]}
          onPress={handleButtonClick}
          disabled={!msg.trim() || isLoading}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#ffffff",
    elevation: 3,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  backArrow: {
    fontSize: 22,
    marginRight: 10,
  },
  appAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  appTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  onlineStatus: {
    fontSize: 12,
    color: "green",
  },
  appIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  userRow: {
    justifyContent: "flex-end",
  },
  geminiRow: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 28,
    height: 28,
    marginRight: 6,
  },
  message: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: "#3b82f6",
    borderBottomRightRadius: 0,
  },
  geminiMessage: {
    backgroundColor: "#e6e6e6",
    borderBottomLeftRadius: 0,
  },
  userMessageText: {
    color: "white",
    fontSize: 15,
  },
  geminiMessageText: {
    color: "black",
    fontSize: 15,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom:20
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 50,
    padding: 10,
  },
  sendIcon: {
    color: "white",
    fontSize: 18,
  },
});

export default ChatScreen;
