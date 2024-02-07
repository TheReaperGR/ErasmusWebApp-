(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php_scripts/file_reader.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
        var receivedValue = xhr.responseText.trim();
        var loggedInCookie = document.cookie.match('(^|;)\\s*logged_in\\s*=\\s*([^;]+)');
  
        if (loggedInCookie && receivedValue === loggedInCookie[2]) {

          console.log('Received value matches the value of logged_in cookie');
        } else {
          window.location.href = 'sign-up.html';
          console.log('Received value does not match the value of logged_in cookie');
        }
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
        console.error('Error:', xhr.status);
      }
    };
  
    xhr.send();
  })();