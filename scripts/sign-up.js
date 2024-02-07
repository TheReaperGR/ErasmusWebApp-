let user = {
  fname: "empt",
  lname: "empt",
  am: "empt",
  phone: "empt",
  email: "empt",
  usr: "empt",
  pass: "empt",
  registeredAcc: false
};

function checkform() {
  var pattern = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  var pattern2 = /^(2022|2024|2025)\d{9}$/;
  var pattern3 = /^\d{10}$/;
  var pattern4 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var pass = document.getElementById("pass").value;
  var passcomf = document.getElementById("pcom").value;

  var f_name = document.getElementById("FN").value;
  var l_name = document.getElementById("LN").value;
  var am = document.getElementById("AM").value;
  var phone = document.getElementById("pn").value;
  var email = document.getElementById("email").value;
  var usr = document.getElementById("username").value;

  if (pattern.test(f_name)) {
    alert("Invalid Name");
  } else {
    user.fname = f_name;
  }

  if (pattern.test(l_name)) {
    alert("Invalid Last Name");
  } else {
    user.lname = l_name;
  }

  if (!(pattern2.test(am))) {
    alert("Invalid AM");
  } else {
    checkFieldAvailability("AM", am,  function() {
      user.am = am;
      checkFieldAvailability("email", email,  function() {
        user.email = email;
        checkFieldAvailability("phone", phone,  function() {
          user.phone = phone;
          checkFieldAvailability("username", usr,  function() {
            user.usr = usr;

            if (pass !== passcomf) {
              alert("Passwords do not match");
            } else {
              user.pass = pass;
              user.registeredAcc = true;


              var xhr = new XMLHttpRequest();
              xhr.open("POST", "php_scripts/User.php", true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.onload = function() {
                if (xhr.status === 200) {

                  console.log(xhr.responseText);
                  window.location.href = "login.html";

                } else {

                  console.log("Error: " + xhr.status);
                }
              };
              xhr.send(JSON.stringify(user));
            }
          });
        });
      });
    });
  }

  return false; 
}

function checkFieldAvailability(fieldName, fieldValue,callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php_scripts/checks.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.available) {

        console.log(fieldName + " is available.");
        callback();
      } else {

        alert(fieldName + " is already registered");
      }
    } else {

      console.log("Error: " + xhr.status);
    }
  };
  var data = {
    field: fieldName,
    value: fieldValue
  };
  xhr.send(JSON.stringify(data));
}
