import React from "react";
import MessageLoading from "./message.loading";

function ChatLoading() {
  return (
    <>
      <MessageLoading isReceived />
      <MessageLoading isReceived />
      <MessageLoading isReceived />
      <MessageLoading />
      <MessageLoading />
      <MessageLoading isReceived />
      <MessageLoading />
      <MessageLoading />
    </>
  );
}

export default ChatLoading;
