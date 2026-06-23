import { Suspense } from "react";
import { Chat } from "@/components/chat";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex-1" />}>
      <Chat />
    </Suspense>
  );
}
