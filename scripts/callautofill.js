let redirectFlag = false;

fetch('../php_scripts/autofill.php')
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        if (data.success) {
          // Success response received
          redirectFlag = true;
          console.log('Autofill was called');
          // Perform necessary actions with the data
          console.log('First Name:', data.fname);
          console.log('Last Name:', data.lname);
          console.log('AM:', data.am);
          document.getElementById('name').value = data.fname;
          document.getElementById('lastname').value = data.lname;
          document.getElementById('AM').value = data.am;
          document.getElementById('name').disable = true;
          document.getElementById('lastname').disable = true ;
          document.getElementById('AM').disable = true;


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
