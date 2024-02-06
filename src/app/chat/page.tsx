"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="page-container">
      <br />
      <hr />
      <br />
      <div>
        {messages.map((m) => {
          return (
            <div key={m.id} className={m.role}>
              {m.content}
            </div>
          );
        })}

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            placeholder="I'm in the mood for..."
            onChange={handleInputChange}
            size={100}
          />
        </form>
      </div>
    </div>
  );
}
