const socket = io('http://localhost:3000')

const messageForm = document.querySelector('.chatbox form')
const messageList = document.querySelector('#messagelist')
const userList = document.querySelector('ul#users')
const chatBoxInput = document.querySelector(".chatbox Input")
const useraddForm = document.querySelector(".modal")
const backdrop = document.querySelector(".backdrop")
const useraddinput = document.querySelector(".modal input")
// Socket Listeners

const messages = []
let users =[]

socket.on("message-client", (message)=>{
    messages.push(message)
    updateMessage()
})

socket.on("users", (_users)=>{
    console.log(_users)
    users =_users  
    UpdateUsers()
})



messageForm.addEventListener("submit", messageSubmitHandler)
useraddForm.addEventListener("submit",userAddHandler)

function messageSubmitHandler(e){
    e.preventDefault();
    let message = chatBoxInput.value

    if(!message){
        return alert("Message must not be emptyy")
    }

    socket.emit("message", message)
    chatBoxInput.value=""

}

function updateMessage(){
messageList.textContent=""
for(let i = 0; i< messages.length; i++){
    messageList.innerHTML+=`<li>
    <p>${messages[i].user}</p>
    <p>${messages[i].message}</p>

    </li>`
}
}

function userAddHandler(e){
    e.preventDefault();

    let username = useraddinput.value

    if(!username){
        return alert("You must add a user name")
    }
    socket.emit("adduser", username);

    useraddForm.classList.add("disappear")
    backdrop.classList.add("disappear")
}

function UpdateUsers(){
    userList.textContent=""
    for(let i = 0; i < users.length; i++){
        let node = document.createElement("LI")
        let textnode = document.createTextNode(users[i])
        node.appendChild(textnode)
        userList.appendChild(node)

    }
}












