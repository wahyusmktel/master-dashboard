import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
  Check,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { cn } from "@/lib/utils";

// --- TIPE DATA ---
type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
  status: "sent" | "delivered" | "read";
};

type Contact = {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "typing";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

// --- MOCK DATA ---
const contactsData: Contact[] = [
  {
    id: "1",
    name: "Sarah Wijaya",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    status: "online",
    lastMessage: "Project dashboardnya sudah sampai mana bro?",
    lastMessageTime: "10:30",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Budi Santoso",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60",
    status: "offline",
    lastMessage: "Oke siap, nanti dikabari.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Team Marketing",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a3694c2dd77?w=100&auto=format&fit=crop&q=60",
    status: "online",
    lastMessage: "Meeting jam 2 ya guys",
    lastMessageTime: "Yesterday",
    unreadCount: 5,
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Halo bro, apa kabar?",
    sender: "me",
    time: "10:00",
    status: "read",
  },
  {
    id: "2",
    text: "Halo! Baik bro. Gimana progress master templatenya?",
    sender: "other",
    time: "10:05",
    status: "read",
  },
  {
    id: "3",
    text: "Udah 90% nih, tinggal fitur chat aja.",
    sender: "me",
    time: "10:10",
    status: "read",
  },
  {
    id: "4",
    text: "Wih mantap! Ditunggu rilisnya 🔥",
    sender: "other",
    time: "10:12",
    status: "read",
  },
];

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // Default null (belum pilih chat)
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah saat ada pesan baru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedContact]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setShowEmoji(false);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInputText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-slate-950 dark:border-slate-800">
      {/* --- SIDEBAR LIST KONTAK --- */}
      <div
        className={cn(
          "w-full flex-col border-r bg-slate-50/50 dark:bg-slate-900/50 dark:border-slate-800 md:flex md:w-[320px]",
          selectedContact ? "hidden" : "flex" // Di Mobile: Sembunyikan list kalau lagi buka chat
        )}
      >
        {/* Header List */}
        <div className="flex h-16 items-center justify-between border-b px-4 bg-white dark:bg-slate-950 dark:border-slate-800">
          <h2 className="text-xl font-bold">Chats</h2>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5 text-slate-500" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari kontak..."
              className="pl-9 bg-white dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Contact List */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {contactsData.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                  selectedContact?.id === contact.id
                    ? "bg-red-50 dark:bg-slate-800"
                    : ""
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-900">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  {/* Status Indicator */}
                  {contact.status === "online" && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {contact.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {contact.lastMessage}
                  </p>
                </div>

                {contact.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* --- AREA CHAT UTAMA --- */}
      {selectedContact ? (
        <div className="flex flex-1 flex-col bg-[#efeae2] dark:bg-slate-950 relative">
          {/* Background Pattern ala WhatsApp */}
          <div
            className="absolute inset-0 opacity-5 dark:opacity-[0.02]"
            style={{
              backgroundImage:
                "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            }}
          />

          {/* Header Chat */}
          <div className="relative z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* Back Button (Mobile Only) */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedContact(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {selectedContact.name}
                </h3>
                <p className="text-xs text-green-600 font-medium">
                  {selectedContact.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5 text-slate-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-slate-500" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="relative z-10 flex-1 p-4">
            <div className="flex flex-col gap-3 pb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-2 shadow-sm",
                    msg.sender === "me"
                      ? "self-end bg-green-100 text-slate-900 dark:bg-red-600 dark:text-white rounded-tr-none" // Pesan KITA
                      : "self-start bg-white text-slate-900 dark:bg-slate-800 dark:text-white rounded-tl-none" // Pesan ORANG LAIN
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div
                    className={cn(
                      "flex items-center justify-end gap-1 mt-1",
                      msg.sender === "me"
                        ? "text-green-700/70 dark:text-white/70"
                        : "text-slate-400"
                    )}
                  >
                    <span className="text-[10px]">{msg.time}</span>
                    {msg.sender === "me" &&
                      (msg.status === "read" ? (
                        <CheckCheck className="h-3 w-3 text-blue-500 dark:text-blue-200" />
                      ) : (
                        <Check className="h-3 w-3" />
                      ))}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="relative z-10 p-3 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              {/* Attachment & Emoji */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Document</DropdownMenuItem>
                  <DropdownMenuItem>Image</DropdownMenuItem>
                  <DropdownMenuItem>Camera</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <Smile className="h-5 w-5" />
                </Button>
                {/* Emoji Picker Popup */}
                {showEmoji && (
                  <div className="absolute bottom-12 left-0 z-50">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width={300}
                      height={400}
                    />
                  </div>
                )}
              </div>

              {/* Input Field */}
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 bg-slate-100 border-0 focus-visible:ring-1 focus-visible:ring-red-500 rounded-xl dark:bg-slate-800"
              />

              {/* Send Button */}
              <Button
                type="submit"
                size="icon"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full h-10 w-10 shrink-0"
              >
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        // Tampilan Kanan jika belum pilih chat (Hanya Desktop)
        <div className="hidden flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center p-8 md:flex">
          <div className="h-32 w-32 rounded-full bg-red-50 flex items-center justify-center mb-6 dark:bg-slate-900">
            <div className="animate-pulse">
              <Send className="h-16 w-16 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Master Chat App
          </h2>
          <p className="text-slate-500 max-w-sm">
            Kirim dan terima pesan tanpa perlu menjaga HP Anda tetap nyala.
            Gunakan Master Chat di hingga 4 perangkat sekaligus.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
            <Lock className="h-3 w-3" /> End-to-end encrypted
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Icon Lock (karena belum diimport di atas)
import { Lock } from "lucide-react";
