	  // Initialize Firebase
	var config = {
		apiKey: "AIzaSyAIWLbugKRBWSFmyEzgD_HPYdSFOEhztyk",
		authDomain: "leaguedex.firebaseapp.com",
		databaseURL: "https://leaguedex.firebaseio.com",
		storageBucket: "leaguedex.appspot.com",
		messagingSenderId: "47559996849"
	};
	firebase.initializeApp(config);
  
	function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
	  var confirm = document.getElementById('confirm').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
	  if (password !== confirm){
		  alert('Please enter the same password twice.');
		  return;
	  }
      // Sign in with email and pass.
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
	
	function toggleSignIn() {
      if (firebase.auth().currentUser) {

      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
		
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
        // [END authwithemail]
      }
    }
	
	function googleSignIn() {
      if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END signin]
      } else {
		    alert("you already signed in with an account!");
      }
    }

	function checkStatus(){
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
			window.location.href = 'index.html';
			}
		});
	}
	
	function signout(){
		if(firebase.auth().currentUser){
			firebase.auth().signOut();
			document.getElementById("inout").textContent = "Log In";
		}
	}
	
	function initApp() {
      // Listening for auth state changes.
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          document.getElementById('status').textContent = 'Hi, ' + email;
          document.getElementsByTagName("a")[2].removeAttribute("href");
          document.getElementById('inout').textContent = 'Sign out';
        } 
        else {
          // User is signed out.
          document.getElementById('status').textContent = 'Sign Up';
          document.getElementById('inout').textContent = 'Log In';
        }
      });
	  
    document.getElementById('signup').addEventListener('click', handleSignUp, false);
	  document.getElementById('inout').addEventListener('click', signout, false);
	  document.getElementById('signup').addEventListener('click', checkStatus, false);
	  document.getElementById('google').addEventListener('click', googleSignIn, false);
	  document.getElementById('google').addEventListener('click', checkStatus, false);
    }
	
	
	window.onload = function() {
      initApp();
    };