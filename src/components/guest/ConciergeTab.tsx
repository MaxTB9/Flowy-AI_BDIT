import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useFlowyStore } from "../../state/store";

interface ChatMessage {
  id: string;
  from: "guest" | "staff" | "system";
  text: string;
}

// SCRIPTED: deterministic mock for demo — pre-written prompt chips and replies
const PROMPT_CHIPS: { label: string; userText: string; reply: string }[] = [
  {
    label: "Towels",
    userText: "Could I get extra towels, please?",
    reply:
      "Of course, Maria — fresh towels are on their way to room 214 in about 10 minutes. Anything else?",
  },
  {
    label: "Late check-out",
    userText: "Any chance of a late check-out on departure day?",
    reply:
      "As a Gold member you're pre-approved for a 2 pm late check-out at no extra charge. I've added it to your booking.",
  },
  {
    label: "Airport transfer",
    userText: "Can you book me an airport transfer?",
    reply:
      "Absolutely. I have a private transfer at €38, or a shared shuttle at €15. Which would you prefer?",
  },
];

export default function ConciergeTab() {
  const guest = useFlowyStore((s) => s.currentGuest);
  const alerts = useFlowyStore((s) => s.alerts);

  const guestVisibleAcked = useMemo(
    () =>
      alerts.find(
        (a) => a.guestVisible && a.acknowledged && a.title.includes("leak")
      ),
    [alerts]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m_intro",
      from: "staff",
      // SCRIPTED: deterministic mock for demo
      text: `Hi ${guest.name.split(" ")[0]} — I'm your AI concierge, here 24/7. How can I help?`,
    },
  ]);

  // SCRIPTED: when ops acknowledges the leak alert, prepend an apology
  useEffect(() => {
    if (!guestVisibleAcked) return;
    setMessages((prev) => {
      if (prev.some((m) => m.id === "m_apology")) return prev;
      const apology: ChatMessage = {
        id: "m_apology",
        from: "system",
        // SCRIPTED: deterministic mock for demo
        text:
          "We've detected and resolved a water issue near your wing. As a thank-you for your patience, a €40 spa credit has been added to your account.",
      };
      return [apology, ...prev];
    });
  }, [guestVisibleAcked]);

  function handleChip(chip: (typeof PROMPT_CHIPS)[number]) {
    const userMsg: ChatMessage = {
      id: `m_u_${Date.now()}`,
      from: "guest",
      text: chip.userText,
    };
    setMessages((prev) => [...prev, userMsg]);
    // SCRIPTED: deterministic mock for demo — staff reply after short delay
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `m_s_${Date.now()}`, from: "staff", text: chip.reply },
      ]);
    }, 700);
  }

  return (
    <div className="flex flex-col h-full">
      <header className="px-5 pt-4 pb-3 border-b border-navy/10 bg-white">
        <p className="text-xs text-muted">Concierge</p>
        <h1 className="text-xl font-bold text-navy flex items-center gap-1.5">
          AI Concierge
          <Sparkles className="w-4 h-4 text-sand" />
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-slate-50">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Bubble message={m} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-navy/10 bg-white p-3 space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PROMPT_CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleChip(chip)}
              className="flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-navy/5 text-navy hover:bg-navy/10"
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
          <input
            placeholder="Type a message…"
            disabled
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted"
          />
          <Send className="w-4 h-4 text-muted" />
        </div>
      </div>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  if (message.from === "system") {
    return (
      <div className="rounded-xl bg-sand/15 border border-sand/30 text-navy text-xs p-3">
        <p className="font-semibold mb-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sand" /> From the resort
        </p>
        {message.text}
      </div>
    );
  }
  const isGuest = message.from === "guest";
  return (
    <div className={`flex ${isGuest ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] text-xs px-3 py-2 rounded-2xl ${
          isGuest
            ? "bg-navy text-white rounded-br-sm"
            : "bg-white text-navy rounded-bl-sm border border-navy/10"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
