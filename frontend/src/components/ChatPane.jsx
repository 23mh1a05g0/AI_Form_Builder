import { useState } from "react";

function ChatPane({ setSchema }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://localhost:8080/api/form/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          conversationId,
        }),
      });

      const data = await response.json();

      // 🔴 Ambiguity case
      if (data.status === "clarification_needed") {
        setMessages([
          ...newMessages,
          { role: "ai", text: data.questions.join("\n") },
        ]);
        setConversationId(data.conversationId);
        setInput("");
        return;
      }

      // ✅ Normal response
      setSchema(data.schema);
      setConversationId(data.formId);

      setMessages([
        ...newMessages,
        { role: "ai", text: "Form updated successfully ✅" },
      ]);

    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Chat Builder</h2>

      {/* Messages */}
      <div className="chat-box">
        {messages.length === 0 && (
          <p className="placeholder">Start by describing your form...</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.role}`}
          >
            <span className="label">
              {msg.role === "user" ? "You" : "AI"}
            </span>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your form request..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatPane;