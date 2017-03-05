	window.onload = function() {
      document.getElementById('signup').addEventListener('click', handleSignUp, false);
	  if (firebase.auth().currentUser){
		  alert("Sign up successful");
	  }
    };