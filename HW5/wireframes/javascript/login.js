	  // Initialize Firebase
	var config = {
		apiKey: "AIzaSyAIWLbugKRBWSFmyEzgD_HPYdSFOEhztyk",
		authDomain: "leaguedex.firebaseapp.com",
		databaseURL: "https://leaguedex.firebaseio.com",
		storageBucket: "leaguedex.appspot.com",
		messagingSenderId: "47559996849"
	};
	firebase.initializeApp(config);
  
  
  // checks for errors in email and password signup
	function handleSignUp() {
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
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
	
  // called upon successful email signup
	function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        alert('You already logged in');
        // [END signout]
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
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
    }
	
  // used to sign into google account
	function googleSignIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
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
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
        });
        // [END signin]
      } else {
        // [START signout]
		alert("you already signed in with an account!");
        // [END signout]
      }
    }

  // directs user to home page upon successful signin
	function checkStatus(){
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
			window.location.href = 'index.html';
			}
		});
	}
	
  // called when user signs out
	function signout(){
		if(firebase.auth().currentUser){
			firebase.auth().signOut();
			document.getElementById("inout").textContent = "Log In";
		}
	}
	
  // called on window page load
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
          document.getElementById('inout').textContent = 'Sign out';
        } 
        else {
          // User is signed out.
          document.getElementById('status').textContent = 'Sign Up';
          document.getElementById('inout').textContent = 'Log In';
        }

      });
	  document.getElementById('login').addEventListener('click', toggleSignIn, false);
	  document.getElementById('inout').addEventListener('click', signout, false);
	  document.getElementById('login').addEventListener('click', checkStatus, false);
	  document.getElementById('google').addEventListener('click', googleSignIn, false);
	  document.getElementById('google').addEventListener('click', checkStatus, false);
    }
	
	
	window.onload = function() {
      initApp();
    };