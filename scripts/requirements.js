
function checkreq(){
const currentYearSelect = document.getElementById("currentyear");
const currentYear = currentYearSelect.value;


const percentPassedInput = document.getElementById("number");
const percentPassed = percentPassedInput.value;

const averageGradeInput = document.getElementById("number2");
const averageGrade = averageGradeInput.value;

const englishRadioButtons = document.getElementsByName("english");
var englishLevel = "";
for (const radioButton of englishRadioButtons) {
  if (radioButton.checked) {
    englishLevel = radioButton.value;
    break;
  }
}

if(currentYear < 2){
  console.log('enter1');
    alert("You need to be on your 2nd year or higher");
    
}

if(percentPassed < 70){
  console.log('enter2');

    alert("You have passed too few courses the past year");
}
if(averageGrade < 6.50){
  console.log('enter2');
    alert("your grade is too low");
}

if(englishLevel === "a1" || englishLevel === "a2" || englishLevel === "b1"){
  console.log('enter2');
    alert("Your english level is too low");
}

}