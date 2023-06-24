// https://we-are-the-champions-3d95c-default-rtdb.firebaseio.com/


//Setup database
//When click button get text from input field
//Clear input field
//Add text as li element to Ul 
//Add input field data to database
//render new list of items

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://townhall-580ec-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const questionsInDB = ref(database, "questionsList")


const formData = document.getElementById("input-el");
const submitButton = document.getElementById("publish-btn");
const nameEl = document.getElementById("name-el");
const questions = document.getElementById("questions-el");
const questionUl = document.getElementById("questions");


onValue(questionsInDB, function(snapshot) {
    if (snapshot.exists()) {
        //console.log("Something has changed!")
        let questionsArray = Object.entries(snapshot.val())

        clearQuestions()

        for(let i=0; i <questionsArray.length; i++){
            appendItemToQuestions(questionsArray[i]);
        }
    }else{
        questions.innerHTML = ""
    }
})




submitButton.addEventListener("click", function(){
    buttonPressed();
});


function buttonPressed(){
    const textData = formData.value;
    let nameData = nameEl.value;

    if(nameData == ""){
        nameData = "Anonymous";
    }

    let allInfo = {
        question: textData,
        whoAsked: nameData,
        likes: 0
    }

    if(textData !== ""){
        //console.log(`The Button has been clicked! Logging: ${textData}`);
        push(questionsInDB, allInfo)
        clearInputField();
    }

}



function clearQuestions(){
    questions.innerHTML = "";
}

function clearInputField(){
    formData.value = "";
    nameEl.value = "";
}

function appendItemToQuestions(question){
    
    const newQuestion = document.createElement("li");
    const newAsker = document.createElement("p");

    newQuestion.textContent = question[1].question;
    newQuestion.innerHTML += `<br><h4>Asked by: ${question[1].whoAsked}</h4>`;

    //newQuestion.innerHTML += newAsker;
    //newQuestion.innerHTML = `Asked by: ${question[1].whoAsked}`;


    const questionID = question[0];
    
     newQuestion.addEventListener("click", function(){
        let exactLocationInDB = ref(database, `questionsList/${questionID}`)
        //console.log("Question has been clicked!")
        remove(exactLocationInDB);
     })

    questions.append(newQuestion);
    //questions.append(newAsker);
    console.log(question[1].whoAsked);


}





