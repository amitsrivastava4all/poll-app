import { dbOperations } from "./db-operations.js";

window.addEventListener('load', ()=>{
    loadQuestion();
});

function getQuestionId(){
    const currentURL = location.href;
    const url = new URLSearchParams(currentURL);
    let questionid = 0;
    url.forEach(e=>questionid=e);
    console.log('Question id is ',questionid);
    return questionid;
}
let questionObject;
function loadQuestion(){
   // console.log('Current Location ', location.href);
//    const currentURL = location.href;
//    const url = new URLSearchParams(currentURL);
//    let questionid = 0;
//    url.forEach(e=>questionid=e);
//    console.log("Question Id is ", questionid);
   const  questionid = getQuestionId();
   document.querySelector('#questionid').innerText = questionid;
   dbOperations.getQuestionById(questionid, printQuestion);
}

function printQuestion(question){
    questionObject = question;
    const div = document.querySelector('#single-question');
   
    const h2 = document.createElement('h2');
    h2.innerText = question.ques;
    div.appendChild(h2);
    createOption(question, div, 'option1');
    createOption(question, div, 'option2');
    createOption(question, div, 'option3');
    createOption(question, div, 'option4');
    div.appendChild(createButton(getQuestionId()));
    
}

async function submitAnswer(){
    const answerOption = document.querySelector('input[name="opt"]:checked');
    console.log('Answer Option ', answerOption.value);
    const answerValue = answerOption.value;
    const userInfo = JSON.parse(localStorage.userInfo);
    const answerObject = {
        'answer':answerValue,
        'user':userInfo.email,
        'qid': this.getAttribute('qid')

    }
    console.log('Answer Object is ', answerObject);
    try{
    await dbOperations.addAnswer(answerObject);
    alert('Answer Submitted...');
    generateReport(this.getAttribute('qid'), answerValue);
    }
    catch(err){
            alert("Problem in Answering...");
            console.log('Error in Submit Answer ', err);
    }
    
}


async function generateReport(qid, answerValue){
    const ctx = document.getElementById('myChart');
    const option1Count = await dbOperations.getColumnCount(qid, questionObject['option1']);
    const option2Count = await dbOperations.getColumnCount(qid, questionObject['option2']);
    const option3Count = await dbOperations.getColumnCount(qid, questionObject['option3']);
    const option4Count = await dbOperations.getColumnCount(qid, questionObject['option4']);
    console.log('Option1 Count ', option1Count);
    console.log('Option2 Count ', option2Count);
    console.log('Option3 Count ', option3Count);
    console.log('Option4 Count ', option4Count);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [questionObject['option1'], questionObject['option2'], questionObject['option3'], questionObject['option4'] ],
      datasets: [{
        label: '# of Votes',
        data: [option1Count, option2Count, option3Count, option4Count],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function createButton(qid){
    const button = document.createElement('button');
    button.innerText = 'Submit Your Answer';
    button.className = 'btn btn-primary';
    button.setAttribute('qid', qid);
    button.addEventListener('click',submitAnswer);
    return button;
}

function createOption(question, div, key){
    const option1 = document.createElement('input');
    option1.name = 'opt';
    option1.type='radio';
    option1.value = question[key];
    const span = document.createElement('span');
    span.innerText = question[key];
    div.appendChild(option1);
    div.appendChild(span);
    div.appendChild(document.createElement('br'));
}