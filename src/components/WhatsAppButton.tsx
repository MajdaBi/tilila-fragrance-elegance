import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/212647686734"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full p-4 shadow-luxe transition-luxe hover:scale-110 animate-fade-in"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);

export default WhatsAppButton;
