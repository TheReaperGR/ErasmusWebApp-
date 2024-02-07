// Function to check if all fields are filled out
function validateForm() {
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var AM = document.getElementById("AM").value;
    var passedLessonsPre = document.getElementById("passedLessonsPre").value;
    var avgPassedLessons = document.getElementById("avgPassedLessons").value;
    var englishLevel = document.querySelector('input[name="englishLevel"]:checked');
    var extraLang = document.querySelector('input[name="yesExtraLang"]:checked');
    var partnerUni1 = document.getElementById("partnerUnis#1").value;
    var partnerUni2 = document.getElementById("partnerUnis#2").value;
    var partnerUni3 = document.getElementById("partnerUnis#3").value;
    var fullGrade = document.getElementById("fullGrade").value;
    var englishCert = document.getElementById("englishCert").value;
    var otherCert = document.getElementById("otherCert").value;
    var checkbox = document.getElementById("checkbox").checked;
  
    if (
      name === "" ||
      lastname === "" ||
      AM === "" ||
      passedLessonsPre === "" ||
      avgPassedLessons === "" ||
      !englishLevel ||
      !extraLang ||
      partnerUni1 === "" ||
      partnerUni2 === "" ||
      partnerUni3 === "" ||
      fullGrade === "" ||
      englishCert === "" ||
      otherCert === "" ||
      !checkbox
    ) {
      alert("Please fill out all fields before submitting the form.");
      return false;
    }
  
    return true;
  }
  
  function submitForm(event) {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    var formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("lastname", document.getElementById("lastname").value);
    formData.append("AM", document.getElementById("AM").value);
    formData.append("passedLessonsPre", document.getElementById("passedLessonsPre").value);
    formData.append("avgPassedLessons", document.getElementById("avgPassedLessons").value);
    formData.append("englishLevel", document.querySelector('input[name="englishLevel"]:checked').value);
    formData.append("extraLang", document.querySelector('input[name="yesExtraLang"]:checked').value);
    formData.append("partnerUni1", document.getElementById("partnerUnis#1").value);
    formData.append("partnerUni2", document.getElementById("partnerUnis#2").value);
    formData.append("partnerUni3", document.getElementById("partnerUnis#3").value);
    formData.append("fullGrade", document.getElementById("fullGrade").files[0]);
    formData.append("englishCert", document.getElementById("englishCert").files[0]);
  
    var otherCertFiles = document.getElementById("otherCert").files;
    for (var i = 0; i < otherCertFiles.length; i++) {
      formData.append("otherCert[]", otherCertFiles[i]);
    }
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php_scripts/application.php");
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert("Form submitted successfully!");
      } else {
        alert("Form submission failed. Please try again.");
      }
    };
    xhr.send(formData);
  }
  