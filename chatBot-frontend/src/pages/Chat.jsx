import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_ASSISTANT = "Hi! I'm your assistant — ask me anything.";

function Sidebar({ chats, activeChatId, onSelect, onNewChat, onLogout }) {
    return (
        <aside className="w-1/6 bg-[#131313] text-white flex flex-col">
            <div className="p-4 flex items-center gap-3 justify-between">
                <div className="font-semibold text-lg">ChatGPT</div>
                <button
                    onClick={onLogout}
                    className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md"
                >
                    Logout
                </button>
            </div>

            <div className="p-3">
                <button
                    onClick={onNewChat}
                    className="w-full bg-[#1E1E1E] text-sm py-2 rounded flex items-center justify-center gap-2 hover:bg-white/10"
                >
                    + New chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
                {chats.map((c) => (
                    <div
                        key={c.id}
                        onClick={() => onSelect(c.id)}
                        className={`p-3 rounded-md mb-2 cursor-pointer hover:bg-white/10 transition-colors ${c.id === activeChatId ? "bg-white/20" : ""
                            }`}
                    >
                        <div className="text-sm font-medium truncate">{c.title}</div>
                        <div className="text-xs text-white/60 truncate">{c.preview}</div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

function Header({ title }) {
    return (
        <header className="h-14 flex items-center px-6 border-b border-zinc-700 bg-[#1E1E1E] text-white/90">
            <div className="text-lg font-semibold">{title}</div>
        </header>
    );
}

function MessageBubble({ role, content }) {
    const isUser = role === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`${isUser
                        ? "bg-[#2A2A2A] text-white rounded-full px-4 py-2"
                        : "bg-[#1E1E1E] text-white rounded-full px-4 py-2"
                    } max-w-[70%]`}
            >
                {content}
            </div>
        </div>
    );
}

export default function Chat() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const [chats, setChats] = useState(() => {
        const id = 1;
        return [
            {
                id,
                title: "AssistanTO",
                preview: "I am planning to make a chatbot...",
                messages: [{ role: "assistant", content: DEFAULT_ASSISTANT }],
            },
        ];
    });
    const [activeChatId, setActiveChatId] = useState(chats[0].id);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Check login
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    // Scroll to bottom whenever chat updates
    useEffect(() => {
        requestAnimationFrame(() => {
            if (scrollRef.current)
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        });
    }, [chats, loading]);

    function createNewChat() {
        const id = Date.now();
        const newChat = {
            id,
            title: "New chat",
            preview: "",
            messages: [{ role: "assistant", content: DEFAULT_ASSISTANT }],
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(id);
    }

    async function sendMessage() {
        if (!input.trim()) return;
        const text = input.trim();
        setInput("");

        setChats((prev) =>
            prev.map((c) =>
                c.id === activeChatId
                    ? { ...c, messages: [...c.messages, { role: "user", content: text }] }
                    : c
            )
        );

        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:8000/chat", { text });
            const reply = res?.data?.reply ?? "Sorry, no reply.";

            setChats((prev) =>
                prev.map((c) =>
                    c.id === activeChatId
                        ? {
                            ...c,
                            messages: [
                                ...c.messages,
                                { role: "assistant", content: reply },
                            ],
                            preview: text,
                        }
                        : c
                )
            );
        } catch (err) {
            setChats((prev) =>
                prev.map((c) =>
                    c.id === activeChatId
                        ? {
                            ...c,
                            messages: [
                                ...c.messages,
                                { role: "assistant", content: "⚠️ Error connecting to server." },
                            ],
                        }
                        : c
                )
            );
        } finally {
            setLoading(false);
        }
    }

    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    const activeChat = chats.find((c) => c.id === activeChatId);

    // ✅ Logout
    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className="h-screen flex text-sm">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onSelect={setActiveChatId}
                onNewChat={createNewChat}
                onLogout={handleLogout}
            />

            <div className="flex-1 flex flex-col">
                <Header title={activeChat?.title || "Chat"} />

                <main className="flex-1 bg-[#1E1E1E] p-6 overflow-hidden flex flex-col">
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto pr-4 space-y-4 scrollbar-thin"
                    >
                        {activeChat?.messages.map((m, idx) => (
                            <MessageBubble key={idx} role={m.role} content={m.content} />
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#111214] text-white px-4 py-2 rounded-2xl rounded-bl-none animate-pulse">
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-zinc-600 pt-4">
                        <div className="flex items-center gap-3 justify-center">
                            <textarea
                                rows={1}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask anything..."
                                className="w-1/2 resize-none rounded-full bg-[#2A2A2A] text-white p-3 outline-none border border-zinc-600 placeholder:text-white/40"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="bg-[#2A2A2A] px-4 py-2 rounded-full text-white font-medium hover:bg-[#dc2626] disabled:opacity-60"
                            >
                                Send
                            </button>
                        </div>
                        <div className="text-xs text-white/50 mt-2 text-center">
                            Press Enter to send, Shift+Enter for newline
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
