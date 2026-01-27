/**
 * ResultantAI Chatbot Widget
 * ===========================
 *
 * Features:
 * - Industry detection and page-aware context
 * - Conversation history management
 * - Auto-detection of booking opportunities
 * - Mobile responsive
 * - localStorage for conversation persistence
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiEndpoint: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000/chat'
      : 'https://resultantai-github-io.onrender.com/chat',
    storageKey: 'resultant_chat_history',
    maxHistoryLength: 20, // Keep last 20 messages
  };

  // State
  let conversationHistory = [];
  let isTyping = false;
  let isOpen = false;

  /**
   * Get page context for the current page
   */
  function getPageContext() {
    const url = window.location.href;
    const pathname = window.location.pathname;

    // Detect page type
    let pageType = 'homepage';
    if (pathname.includes('propane')) pageType = 'propane';
    else if (pathname.includes('logistics') || pathname.includes('trucking')) pageType = 'logistics';
    else if (pathname.includes('field-services')) pageType = 'field-services';
    else if (pathname.includes('agencies')) pageType = 'agencies';
    else if (pathname.includes('b2b')) pageType = 'b2b';
    else if (pathname.includes('case-studies')) pageType = 'case-studies';
    else if (pathname.includes('gateway')) pageType = 'gateway';

    // Get UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');

    return {
      url,
      page_type: pageType,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
    };
  }

  /**
   * Initialize the chatbot
   */
  function initChatbot() {
    // Load conversation history from localStorage
    loadConversationHistory();

    // Create chatbot UI
    createChatbotUI();

    // Bind events
    bindEvents();

    // If there's no conversation history, show welcome message after a delay
    if (conversationHistory.length === 0) {
      setTimeout(() => {
        addWelcomeMessage();
      }, 2000);
    }
  }

  /**
   * Create chatbot UI elements
   */
  function createChatbotUI() {
    const container = document.createElement('div');
    container.id = 'resultant-chatbot';
    container.innerHTML = `
      <!-- Chat Toggle Button -->
      <button class="chat-toggle" aria-label="Open chat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Chat Window -->
      <div class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-left">
            <div class="chat-avatar">R</div>
            <div class="chat-header-text">
              <h3>ResultantAI</h3>
              <p>Usually replies instantly</p>
            </div>
          </div>
          <button class="chat-close" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="chat-messages" id="chat-messages">
          <!-- Messages will be added here dynamically -->
        </div>

        <!-- Input -->
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <textarea
              class="chat-input"
              id="chat-input"
              placeholder="Ask about our revenue systems..."
              rows="1"
            ></textarea>
            <button class="chat-send-btn" id="chat-send-btn" aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="chat-footer">
          Powered by <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Restore conversation history UI
    renderConversationHistory();
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    const toggleBtn = document.querySelector('.chat-toggle');
    const closeBtn = document.querySelector('.chat-close');
    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input');
    const chatWindow = document.querySelector('.chat-window');

    // Toggle chat
    toggleBtn.addEventListener('click', () => {
      toggleChat();
    });

    // Close chat
    closeBtn.addEventListener('click', () => {
      closeChat();
    });

    // Send message on button click
    sendBtn.addEventListener('click', () => {
      sendMessage();
    });

    // Send message on Enter (but allow Shift+Enter for new line)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', () => {
      autoResizeTextarea(input);
    });

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (isOpen && !chatWindow.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeChat();
      }
    });
  }

  /**
   * Toggle chat open/closed
   */
  function toggleChat() {
    isOpen = !isOpen;
    const chatWindow = document.querySelector('.chat-window');
    const toggleBtn = document.querySelector('.chat-toggle');

    if (isOpen) {
      chatWindow.classList.add('open');
      toggleBtn.classList.add('open');
      document.getElementById('chat-input').focus();
    } else {
      chatWindow.classList.remove('open');
      toggleBtn.classList.remove('open');
    }
  }

  /**
   * Close chat
   */
  function closeChat() {
    isOpen = false;
    document.querySelector('.chat-window').classList.remove('open');
    document.querySelector('.chat-toggle').classList.remove('open');
  }

  /**
   * Add welcome message based on page context
   */
  function addWelcomeMessage() {
    const pageContext = getPageContext();
    const welcomeMessages = {
      homepage: "Hey there. I can help you figure out if ResultantAI is a fit for your business. What kind of work does your company do?",
      propane: "Looking at propane delivery systems? I can answer questions about pricing, deployment timeline, or how our system compares to ADD Systems and Suburban. What would be most helpful?",
      logistics: "Interested in trucking and logistics dispatch systems? I can explain how we help eliminate paper tickets and speed up billing. What would you like to know?",
      'field-services': "Checking out our field services solutions? I can tell you about our 24/7 AI call handling, dispatch automation, and how Wayne Conn Plumbing captured $5K/month with our system. What interests you most?",
      agencies: "Looking at solutions for marketing agencies? I can explain how Adleg reduced their audit time from 90 minutes to 2 minutes, or talk about AI cost control with our Gateway product. What brings you here?",
      b2b: "Interested in scaling your B2B service business? I can discuss sales automation, onboarding systems, or how to remove yourself as the bottleneck. What challenge are you facing?",
      'case-studies': "These case studies show real results from real clients. Want me to help you figure out which one is most relevant to your situation?",
      gateway: "AI Gateway helps agencies and SaaS companies control AI costs. Are you looking to reduce your current spend, or just exploring options?",
      default: "Hey there. I can help you understand how ResultantAI builds revenue systems for service businesses. What would you like to know?"
    };

    const message = welcomeMessages[pageContext.page_type] || welcomeMessages.default;
    addMessage('assistant', message);
  }

  /**
   * Send user message
   */
  async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message || isTyping) return;

    // Add user message to UI
    addMessage('user', message);

    // Clear input
    input.value = '';
    autoResizeTextarea(input);

    // Disable send button
    setTypingState(true);

    try {
      // Prepare request data
      const requestData = {
        message: message,
        conversation_history: conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        page_context: getPageContext()
      };

      // Call API
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant response to UI
      if (data.response) {
        addMessage('assistant', data.response, data.booking_url);
      } else if (data.error) {
        addMessage('assistant', `Sorry, I encountered an error: ${data.error}. Please try again or email support@resultantai.com`, null, true);
      }

    } catch (error) {
      console.error('Chatbot error:', error);
      addMessage('assistant', 'Sorry, I\'m having trouble connecting right now. Please try again in a moment, or email us at support@resultantai.com', null, true);
    } finally {
      setTypingState(false);
    }
  }

  /**
   * Add message to conversation
   */
  function addMessage(role, content, bookingUrl = null, isError = false) {
    const messagesContainer = document.getElementById('chat-messages');

    // Add to conversation history (don't store errors in history)
    if (!isError) {
      conversationHistory.push({ role, content });

      // Trim history if it gets too long
      if (conversationHistory.length > CONFIG.maxHistoryLength) {
        conversationHistory = conversationHistory.slice(-CONFIG.maxHistoryLength);
      }

      // Save to localStorage
      saveConversationHistory();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${role}`;

    const avatar = role === 'user' ? 'U' : 'R';

    // Format content (basic markdown-like formatting)
    const formattedContent = formatMessageContent(content);

    messageEl.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        ${formattedContent}
        ${bookingUrl ? `<a href="${bookingUrl}" target="_blank" class="quick-action">Book a Call →</a>` : ''}
      </div>
    `;

    messagesContainer.appendChild(messageEl);
    scrollToBottom();
  }

  /**
   * Format message content with basic markdown support
   */
  function formatMessageContent(content) {
    // Split into paragraphs
    const paragraphs = content.split('\n\n');

    return paragraphs.map(p => {
      // Convert bold (**text**)
      p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      // Convert links [text](url)
      p = p.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

      return `<p>${p}</p>`;
    }).join('');
  }

  /**
   * Set typing state and show/hide typing indicator
   */
  function setTypingState(typing) {
    isTyping = typing;
    const sendBtn = document.getElementById('chat-send-btn');
    const messagesContainer = document.getElementById('chat-messages');

    sendBtn.disabled = typing;

    if (typing) {
      // Add typing indicator
      const typingEl = document.createElement('div');
      typingEl.className = 'typing-indicator';
      typingEl.id = 'typing-indicator';
      typingEl.innerHTML = `
        <div class="message-avatar">R</div>
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      messagesContainer.appendChild(typingEl);
      scrollToBottom();
    } else {
      // Remove typing indicator
      const typingEl = document.getElementById('typing-indicator');
      if (typingEl) {
        typingEl.remove();
      }
    }
  }

  /**
   * Scroll to bottom of messages
   */
  function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Auto-resize textarea
   */
  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  /**
   * Save conversation history to localStorage
   */
  function saveConversationHistory() {
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(conversationHistory));
    } catch (e) {
      console.error('Failed to save conversation history:', e);
    }
  }

  /**
   * Load conversation history from localStorage
   */
  function loadConversationHistory() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKey);
      if (stored) {
        conversationHistory = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load conversation history:', e);
      conversationHistory = [];
    }
  }

  /**
   * Render conversation history
   */
  function renderConversationHistory() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';

    conversationHistory.forEach(msg => {
      const messageEl = document.createElement('div');
      messageEl.className = `message ${msg.role}`;

      const avatar = msg.role === 'user' ? 'U' : 'R';
      const formattedContent = formatMessageContent(msg.content);

      messageEl.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
          ${formattedContent}
        </div>
      `;

      messagesContainer.appendChild(messageEl);
    });

    if (conversationHistory.length > 0) {
      scrollToBottom();
    }
  }

  /**
   * Clear conversation history (optional, for debugging)
   */
  window.clearChatHistory = function() {
    conversationHistory = [];
    localStorage.removeItem(CONFIG.storageKey);
    renderConversationHistory();
    console.log('Chat history cleared');
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
