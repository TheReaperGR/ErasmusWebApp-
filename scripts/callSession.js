fetch('../php_scripts/Session.php')
  .then(response => {
    if (response.ok) {

      console.log('PHP script executed successfully');

    } else {

      console.error('Error executing PHP script');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });