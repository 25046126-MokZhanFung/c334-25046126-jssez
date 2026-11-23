import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.46.5/dist/chat.bundle.es.js';

createChat({
  target: '#n8n-chat',
  mode: 'window',
  webhookUrl: 'https://agenticflows.tokencraze.org/webhook/e132be1b-bfaa-4148-8589-b644285802c5/chat',
  defaultLanguage: 'en',
  loadPreviousSession: false,
  initialMessages: [
    'Hi, I’m your JS-SEZ advisor.',
    'Ask me about zones, setup, incentives or staff passes.',
  ],
  i18n: {
    en: {
      title: 'JS-SEZ advisor',
      subtitle: 'Ask about the Johor–Singapore Special Economic Zone.',
      inputPlaceholder: 'Type your question...',
    },
  },
});

const chatRoot = document.querySelector('#n8n-chat');

const updateToggleAccessibility = () => {
  const toggle = chatRoot?.querySelector('.chat-window-toggle');
  const chatWindow = chatRoot?.querySelector('.chat-window');

  if (!toggle) return;
  if (chatWindow) chatWindow.id = 'n8n-chat-window';

  if (!toggle.dataset.keyboardAccessible) {
    toggle.tabIndex = 0;
    toggle.setAttribute('role', 'button');
    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle.click();
      }
    });
    toggle.dataset.keyboardAccessible = 'true';
  }

  const isOpen = chatWindow && getComputedStyle(chatWindow).display !== 'none';
  toggle.setAttribute('aria-controls', 'n8n-chat-window');
  toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  toggle.setAttribute('aria-label', `${isOpen ? 'Close' : 'Open'} JS-SEZ advisor chat`);
};

const chatObserver = new MutationObserver(updateToggleAccessibility);
chatObserver.observe(chatRoot, {
  attributes: true,
  attributeFilter: ['class', 'style'],
  childList: true,
  subtree: true,
});
updateToggleAccessibility();
