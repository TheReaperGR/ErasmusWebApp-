// Function to check if the cookie value matches
function checkCookieValue() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php_scripts/file_reader.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        var receivedValue = xhr.responseText.trim();
        var loggedInCookie = document.cookie.match('(^|;)\\s*logged_in\\s*=\\s*([^;]+)');
  
        if (loggedInCookie && receivedValue === loggedInCookie[2]) {
          fetch('../php_scripts/loginmail.php')
            .then(response => {
              if (response.ok) {
                response.json().then(data => {
                  if (data.success) {
                    // Success response received
                    console.log('Autofill was called');
                    // Perform necessary actions with the data
                    console.log('Mail:', data.mail);
                    document.getElementById('email').disabled = true;
                    document.getElementById('email').value = data.mail;
                    document.getElementById('pass').disabled = true;
                    document.getElementById('pass').value = "qwerty";
                    var button = document.getElementById("button");
                    button.innerText = "Log-out";
                    fetch('../php_scripts/session.php');
                  } else {
                    console.error('Match not found');
                  }
                });
              } else {
                console.error('Error executing PHP script');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
  
        } else {
          // Cookie value does not match
        }
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
        console.error('Error:', xhr.status);
      }
    };
  
    xhr.send();
  }
  
  // Call the function to check the cookie value
  checkCookieValue();
  