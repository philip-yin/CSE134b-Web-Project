	  // Initialize Firebase
	var config = {
		apiKey: "AIzaSyAIWLbugKRBWSFmyEzgD_HPYdSFOEhztyk",
		authDomain: "leaguedex.firebaseapp.com",
		databaseURL: "https://leaguedex.firebaseio.com",
		storageBucket: "leaguedex.appspot.com",
		messagingSenderId: "47559996849"
	};
	firebase.initializeApp(config);

	function signout(){
		if(firebase.auth().currentUser){
			firebase.auth().signOut();
			document.getElementById("inout").textContent = "Log In";
		}
	}
	
	function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]

          document.getElementById('status').textContent = 'Hi, ' + email;
          document.getElementsByTagName("a")[2].removeAttribute("href");
          document.getElementById('inout').textContent = 'Sign out';
          //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          if (!emailVerified) {
            //document.getElementById('quickstart-verify-email').disabled = false;
          }
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('status').textContent = 'Sign Up';
          document.getElementById('inout').textContent = 'Log In';
          //document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
	  document.getElementById('inout').addEventListener('click', signout, false);
    }
	
	var cham  = firebase.database().ref('Champions');

    function refresh(list) {
        var lis = '';
        for (var i = 0; i < list.length; i++) {
            lis += '<a href = "'+list[i].profile+
                   '" onClick = "champInfoSend('+list+ ',' + i+')">'+
                   '<figure style = "margin-left: 6%; display:inline-block;">'+
                   '<img src='+list[i].image +' alt="champion" >'+
                   '<figcaption>'+list[i].name+'</figcaption></figure></a>';
        };
        document.getElementById('cham').innerHTML = lis;
    }
	
	function champInfoSend(list,i){
		document.cookie = "champName=" + list[i].name + "; image=" + list[i].image;
	}

    var onValue = function(snapshot) {
        var data = snapshot.val();
        var list = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                list.push({
                    image: data[key].image,
                    profile:data[key].profile,
                    name: data[key].name
                });
            }
        }
        refresh(list);
    }
	
	window.onload = function() {
      initApp();
	  cham.once("value").then(onValue);
    };
