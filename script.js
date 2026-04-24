// --- Form Submission Logic ---
const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page reload
    
    // Capturing all data including Phone and Age
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const role = document.getElementById('role').value;
    
    // Automation Idea: Auto-Data Summary Logging (Console)
    console.log(`[Auto-Summary] New ${role.toUpperCase()} registered:`);
    console.log(`Name: ${name} | Age: ${age} | Phone: ${phone}`);
    console.log(`Forwarding to respective NGO department.`);
    
    // UI Update
    formMessage.classList.remove('hidden');
    form.reset();
    
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 4000);
});


// --- AI Chatbot Toggle Logic ---
const floatingChatBtn = document.getElementById('floatingChatBtn');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChat = document.getElementById('closeChat');

// Open/Close chat when floating button is clicked
floatingChatBtn.addEventListener('click', () => {
    if (chatbotWindow.style.display === 'none') {
        chatbotWindow.style.display = 'block';
    } else {
        chatbotWindow.style.display = 'none';
    }
});

// Close chat when 'X' is clicked inside the chat header
closeChat.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});


// --- AI Chatbot Messaging Logic ---
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(sender === 'bot' ? 'bot-msg' : 'user-msg');
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
}

function processAIBotResponse(input) {
    const lowerInput = input.toLowerCase();
    
    // Simulated AI Keyword Matching for FAQs
    if (lowerInput.includes('volunteer')) {
        return "To volunteer, fill out the form on this page and select 'Volunteer' as your role. Our team will email you the schedule.";
    } else if (lowerInput.includes('time') || lowerInput.includes('timing')) {
        return "Our NGO operates from 9 AM to 6 PM, Monday to Saturday.";
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone')) {
        return "You can reach us at support@careconnectngo.org or call 1800-123-456.";
    } else {
        return "I am an AI assistant. I can help with FAQs. Can you rephrase your question regarding volunteering or contact info?";
    }
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        appendMessage('user', text);
        userInput.value = '';
        
        // Simulate bot thinking delay
        setTimeout(() => {
            const botReply = processAIBotResponse(text);
            appendMessage('bot', botReply);
        }, 600);
    }
});

// Allow hitting Enter key to send message
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});