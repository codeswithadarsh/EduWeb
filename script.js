


const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
// const API_KEY = "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"; // Paste your API key here
const API_KEY = "AIzaSyDrdBIv8v3QOWsX2ujlz2WxNGGl6WYRphc"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));








const apiUrl = 'https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=1d32f602&app_key=e384be1f26386f184398a6824715961d';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the API response data to the console

    const jobTitlesList = document.getElementById('jobTitlesList');
    jobTitlesList.innerHTML = ''; // Clear existing job titles

    // Function to truncate title to max 5 words
    const truncateTitle = (title, maxWords) => {
      const words = title.split(' ');
      return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : title;
    };

    // Loop through the results and display the first 5 job titles
    for (let i = 0; i < 5 && i < data.results.length; i++) {
      const job = data.results[i];
      const listItem = document.createElement('li');
      const jobLink = document.createElement('a');
      jobLink.classList.add('job-link');
      jobLink.textContent = truncateTitle(job.title, 8);
      jobLink.href = job.redirect_url;
      jobLink.target = '_blank';
      listItem.appendChild(jobLink);
      jobTitlesList.appendChild(listItem);
    }
  })
  .catch(error => {
    console.error('Error fetching job titles:', error);
  });



  const newsApiKey = 'fc28f80f394e4ab086d3258228bf3816'; // Replace with your NewsAPI key
  const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=5&apiKey=${newsApiKey}`;

  
// Function to truncate title to max words
const truncateTitle = (title, maxWords) => {
    const words = title.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : title;
};

// Fetch Trending News
fetch(newsApiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the API response data to the console

        const trendingNewsList = document.getElementById('trendingNewsList');
        trendingNewsList.innerHTML = ''; // Clear existing news

        // Loop through the articles and display the first 5
        data.articles.forEach(article => {
            const listItem = document.createElement('li');
            const newsLink = document.createElement('a');
            newsLink.classList.add('news-link');
            newsLink.textContent = truncateTitle(article.title, 6);
            newsLink.href = article.url;
            newsLink.target = '_blank';
            listItem.appendChild(newsLink);
            trendingNewsList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching news:', error);
    });