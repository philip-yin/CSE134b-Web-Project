	window.onload = function() {
      document.getElementById('signup').addEventListener('click', handleSignUp, false);
	  location.reload();
	  if (firebase.auth().currentUser){
		  alert("Sign up successful");
	  }
    };