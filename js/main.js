const widgetChat = document.getElementById("widget-chat");
const wcSpace = document.getElementById("wc-chatspace");
const min = document.getElementById("min");
const max = document.getElementById("max");
const message = document.getElementById("message");
const chat = document.getElementById("chat-list");
const emojis = ['happy', 'neutral', 'angry'];
var chatList = [];

// const moment = require('./moment');
var moment;

function openModal(type) {
    closeModal();
    var title = '';
    var icon = '';
    var accNo = '';
    if (type === 'chat') {
        icon = 'neo-icon-chat';
        title = 'support@teleapps.com';
        accNo = Date.now();
    } else if (type === 'email') {
        icon = 'neo-icon-email';
        title = 'support@teleapps.com';
    } else if (type === 'social-chat') {
        icon = 'neo-icon-social-integrations';
        title = 'Social Chat';
        accNo = Date.now();
    }
    if (title) {
        widgetChat.style.display = 'flex';
        document.getElementById("wc-title").innerHTML = title;
        document.getElementById('wct-icon').className = icon;
        const acContainer = document.getElementById("account-container");
        if (accNo) {
            acContainer.style.display = 'inline';
            document.getElementById("acc-no").innerHTML = accNo;
        } else {
            acContainer.style.display = 'none';
        }
    }
}

function closeModal() {
    widgetChat.style.display = 'none';
}

function minimize() {
    widgetChat.style.height = 'auto';
    wcSpace.style.display = 'none';
    min.style.display = 'none';
    max.style.display = 'inline';
}

function maximize() {
    widgetChat.style.height = '75vh';
    wcSpace.style.display = 'flex';
    max.style.display = 'none';
    min.style.display = 'inline';
}

function sendMessage() {
    if (message.value) {
        chatList.push({
            agentId: document.getElementById("wc-title").innerHTML,
            agentName: 'Suport TeleApps',
            dateTime: moment().format('DD-MM-YYYY hh:mm:ss A'),
            message: message.value
        })
        message.value = null;
        formMessageList();
        setTimeout(() => {
            getResponse();
        }, 2000);
    } else {
        alert('Please type the Message and Send...')
    }
}

function getResponse() {
    const i = Math.floor(Math.random() * 3);
    chatList.push({
        agentId: document.getElementById("wc-title").innerHTML,
        agentName: 'Sample Customer',
        dateTime: moment().format('DD-MM-YYYY hh:mm:ss A'),
        message: 'Hi, I am Sample Customer',
        messageFrom: `Customer_${Date.now()}`,
        emot: emojis[i]
    })
    formMessageList();
}

function formMessageList() {
    var htmlContent = '';
    console.log(chatList);
    for (let cl of chatList) {
        htmlContent = htmlContent ? `${htmlContent}\n${messageFormation(cl)}` : messageFormation(cl);
    }
    chat.innerHTML = htmlContent;
    // console.log(chat.scrollHeight);
    
    // chat.scrollIntoView().scrollTo({
    //     bottom: chat.offsetHeight,
    //     behavior: 'smooth'
    // });
}

function messageFormation(cl) {
    return `<div class="chat-li${!cl.messageFrom ? ' right' : ''}">
        <div class="cl-icon">
            <span id="cl-icon" class="neo-icon-${!cl.messageFrom ? 'agents' : 'contact'}"></span>
            ${cl.emot ? `<img src="./images/emoji/${cl.emot}.svg">` : ''}
        </div>
        <div class="cl-message-container">
            <div class="cl-ml-title"><span style="font-weight: bold">${cl.agentName}</span> ${cl.dateTime}</div>
            <div class="cl-ml-message">${cl.message}</div>
        </div>
    </div>`
}