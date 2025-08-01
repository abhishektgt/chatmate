// Chat.jsx
import React, { useState } from "react";
import axios from "axios";
import "./homepage.css"; 


const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey there! I'm your companion 🤖" },
  ]);
  const [input, setInput] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const res = await axios.post("http://localhost:5000/api/chat", {
            message: input,
            });
            const botReply = {
            from: "bot",
            text: res.data.reply,
            };
            setMessages((prev) => [...prev, botReply]);
        } catch (err) {
            setMessages((prev) => [
            ...prev,
            { from: "bot", text: "Oops! Bot is offline right now." },
            ]);
        }
    };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-indigo-600 text-white p-4 text-center text-xl font-semibold shadow-md">
        Companion Bot
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
              msg.from === "user"
                ? "ml-auto bg-indigo-500 text-white"
                : "mr-auto bg-white text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t flex gap-2 items-center"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
