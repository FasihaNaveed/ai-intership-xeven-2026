type Props = {
  sender: "user" | "ai";
  message: string;
};

export default function ChatMessage({ sender, message }: Props) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-2xl rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >
        {message}
      </div>
    </div>
  );
}