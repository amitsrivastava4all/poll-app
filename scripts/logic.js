import { dbOperations } from "./db-operations.js";
import { db } from "./firebase-config.js";

//window (root object (tab))
const  bindEvents = ()=>{
    const addButton = document.getElementById('add-question');
    addButton.addEventListener('click', showQuestion );
    const publishButton = document.getElementById('publish');
    publishButton.addEventListener('click', publishQuestion);
}

function getAllQuestionsAndPrintIt(){
    document.querySelector('#all-questions').innerHTML ='';
    dbOperations.getAllQuestions(printQuestions);
}

function openQuestion(){
    const currentRow = this;
    const id = currentRow.getAttribute('q-id');
    location.href = 'question.html?question-id='+id;
}

function printQuestions(question){
    console.log('Question is....... ', question);
    const tbody = document.querySelector('#all-questions');
    const tr = tbody.insertRow(); //<tr> </tr>
    tr.setAttribute('q-id', question.id);
    tr.addEventListener('click', openQuestion);
    const td = tr.insertCell();
    td.className = 'hand';
    td.innerHTML = `<strong> ${question.ques} </strong>`;
}

function getUserInfo(){
    if(localStorage){
        if(localStorage.userInfo){
            const user = JSON.parse(localStorage.userInfo);
            document.querySelector('#user-info').innerText = user.name;
        }
        else{
            location.href = 'index.html';
        }
    }
    else{
        alert('Older Browser....');
    }
}
window.addEventListener('load', ()=>{
    bindEvents();
    getUserInfo();
    getAllQuestionsAndPrintIt();
});
//bindEvents();

const showQuestion = ()=>{
    console.log('Show Question Called...');
    // document (Page)
    const questionDiv = document.getElementById('question');
    questionDiv.style.display = 'block';
}
const takeInput = ()=>{
    // question object has user info also
    const ques = document.getElementById('ques').value; // get the value of ques textbox
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const rightAns = document.getElementById('rightans').value;
    const question = {
        ques, option1, option2, option3, option4, rightAns
    }
    return question;
}
const publishQuestion = async ()=>{
     const question = takeInput();  
     console.log('Question is ', question); 
     try{
     const doc =  await dbOperations.addQuestion(question);
     if(doc && doc.id){
        document.querySelector('#msg').innerText = 'Question Added in DB';
     console.log('Document Rec ', doc);
     getAllQuestionsAndPrintIt();
     }
     }
     catch(err){
        document.querySelector('#msg').innerText = 'Error During Question Add';
        console.log('Add Fails... ', err);
     }
    // Take Value from textboxes and store the value in an object
    // and then send this object to the firebase to store.
}