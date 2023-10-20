import { Message } from "@/types";
import { FC } from "react";

interface Props {
  message: Message;
  onCreateImage?: (msg: string) => void;
}

export const ChatMessage: FC<Props> = ({ message, onCreateImage }) => {
  let content = message.content;
  const isHtml = content.includes("```html");
  content = isHtml ? content.replace("```html", "") : content;
  return (
    <div
      className={`group relative  flex flex-col  ${
        message.role === "assistant" ? "items-start" : "items-end"
      }`}
    >
      <div
        className={`flex items-center ${
          message.role === "assistant"
            ? "bg-neutral-200 text-neutral-900"
            : "bg-blue-500 text-white"
        } rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
        // dangerouslySetInnerHTML={isHtml ? { __html: content } : undefined}
      >
        {!isHtml && content}
        {isHtml && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
      </div>
      {message.role === "assistant" && !isHtml && (
        <div
          onClick={() => {
            onCreateImage && onCreateImage(message.content);
          }}
          className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zm6 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zm0 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zm6 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zM5 8H4a2 2 0 00-2 2v2a2 2 0 002 2h1m8 0h3m-3 0H7m10 0a2 2 0 012-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
