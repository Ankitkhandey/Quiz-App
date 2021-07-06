const answerArray=[];
var ansArray=[];
var ansElement=[];
const mainContainer=document.getElementById("main-container");
const submitDiv=document.getElementById("submit-div");
const header=document.getElementById("header");


const quesData=[
    {
        question: "Who discovered Protons?",
        a: "Henery Ford",
        b: "Dalton",
        c: "Rutherford",
        d: "Edision",
        answer:"c"
    },
    {
        question: "What does Big Bang Theory explain?",
        a: "Evolution",
        b: "Creation of the universe",
        c: "String theory",
        d: "Theory of relativity",
        answer: "b"
    },
    {
        question: "Who is the author of ‘Origin of Species’?",
        a: "Einstien",
        b: "Travis",
        c: "Charles Darwin",
        d: "Charles Dicken",
        answer: "c"
    },
    {
        question: "Name the smallest Ocean.",
        a: "Arctic Ocean",
        b: "Pacific Ocean",
        c: "Atlantic Ocean",
        d: "indian Ocean",
        answer: "a"
    },
    {
        question: "What is the SI unit of Force?",
        a: "Torque",
        b: "Kg",
        c: "m/s",
        d: "Newton",
        answer: "d"
    }
]

function displayContent(){
    for(var i=0; i<quesData.length;i++){
        //creating question div
        const div=document.createElement("div");
        div.classList.add("question-container");

        //creating question and appending
        const h2=document.createElement("h2");
        h2.innerText= (i+1)+". "+quesData[i].question;
        h2.classList.add("question");

        div.appendChild(h2);

        //create unordered list
        const ul=document.createElement('ul');
        //create radio and label for each
        const arr=["a","b","c","d"];
        for (var j=0; j<4 ;j++){
            //create list for each option
            const li=document.createElement("li");

            const option=document.createElement("input");
            option.setAttribute("type","radio");
            option.setAttribute("name",i.toString());
            option.setAttribute("id",arr[j]+ (i+1).toString()); 
            option.setAttribute("value",arr[j]);
            option.classList.add("answers");

            const label=document.createElement("label");
            label.setAttribute("for",arr[j]);
            //set value of label
            label.innerHTML= quesData[i][arr[j]];
            label.setAttribute("id",arr[j]+(i+1).toString()+(i+1).toString())
            li.appendChild(option);
            li.appendChild(label);
            ul.appendChild(li);
        }
        div.append(ul);
        mainContainer.appendChild(div);
    }
    
}

function scrollToTop(){
    window.scrollTo(0,0);
}

function selected(){
    clearMarks();
    ansArray=[];
    ansElement=[];
    const answers=document.querySelectorAll(".answers");
    answers.forEach((answer) =>{
        if(answer.checked){
            ansArray.push(answer.value);
            ansElement.push(answer);
        }
    });
    if(ansArray.length==quesData.length){
        clearWarning();
        showMarks(ansArray,ansElement);
    }
    else{
        clearWarning();
        const p=document.createElement("p");
        const text=document.createTextNode("Attempt all the questions");
        p.appendChild(text);
        p.setAttribute("id","warning-msg");
        p.classList.add("wrongAns");
        submitDiv.appendChild(p);
        }
    
    
}

function showMarks(ansArr,ansEl){
    const total=ansArr.length;
    var correct=0;
    scrollToTop();
    for(var j=0;j<ansArr.length;j++){
        //removing class name
        if(ansArr[j]==quesData[j].answer){
            correct+=1;
            
            document.getElementById(ansEl[j].id+(j+1).toString()).classList.add("correctAns");
        }else{
            document.getElementById(ansEl[j].id+(j+1).toString()).classList.add("wrongAns");
        }
    }
    var str="";
    const div=document.createElement("div");
    const h2=document.createElement("h2");
    const p=document.createElement("p");

    if(correct< total*0.31){
        str="failed";
        h2.classList.add("wrongAns");
        p.classList.add("wrongAns");
    }else{
        str="passed";
        h2.classList.add("correctAns");
        p.classList.add("correctAns");
    }
    const marksText=document.createTextNode((correct).toString()+"/"+total.toString());
    const finalText=document.createTextNode("You "+str);

    h2.appendChild(marksText);
    p.appendChild(finalText);
    const button=document.createElement("button");
    button.addEventListener("click",function(){
        window.location.reload();
    });
    button.classList.add("reset-button-top");
    button.innerHTML="Reset";

    div.appendChild(button);
    div.appendChild(h2); 
    div.appendChild(p);
    div.classList.add("header2");
    header.appendChild(div);
}

function clearWarning(){
    const count=submitDiv.childElementCount ;
    if(count>2){
        for (var i=0;i<count-2;i++){
            document.getElementById("warning-msg").remove();
        }
    }
}

function clearMarks(){
    const count=header.childElementCount;
    if(count>1){
        for (var i=0;i<count-1;i++){
        document.getElementById("header2").remove();
        }
    }
}