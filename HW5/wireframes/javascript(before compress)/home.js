	  // Initialize Firebase
	var config = {
		apiKey: "AIzaSyAIWLbugKRBWSFmyEzgD_HPYdSFOEhztyk",
		authDomain: "leaguedex.firebaseapp.com",
		databaseURL: "https://leaguedex.firebaseio.com",
		storageBucket: "leaguedex.appspot.com",
		messagingSenderId: "47559996849"
	};
	firebase.initializeApp(config);

  // called on user signout
	function signout(){
		if(firebase.auth().currentUser){
			firebase.auth().signOut();
			document.getElementById("inout").textContent = "Log In";
		}
	}
	
  //called on window page load
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
	  document.getElementById('inout').addEventListener('click', signout, false);
    }
	
	var cham  = firebase.database().ref('Champions');

    // displays the list of champions in database
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

    // creates the list of champions in database
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
