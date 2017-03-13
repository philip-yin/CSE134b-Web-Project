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
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
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
              if (!emailVerified) {
              }
            } else {
              document.getElementById('status').textContent = 'Sign Up';
              document.getElementById('inout').textContent = 'Log In';
            }
          });
          document.getElementById('inout').addEventListener('click', signout, false);
        }
      
        var fav  = firebase.database().ref('Favorites');
        var cham = firebase.database().ref('Champions');

        firebase.auth().onAuthStateChanged(function(user) {
         if (user) updateFavLabel(user);
        });
      
		window.onload = function(){
            initApp();
            var chamName = document.cookie;
            
			document.getElementById("champname").innerHTML = chamName;
			var cham = firebase.database().ref("Champions");
			var pic = cham.child(chamName);
		    pic.on("value", function(snapshot){
		      var data = snapshot.val();
		      document.getElementById("image").src = data["image"];
          document.getElementById("tips").innerHTML = data["tip"];
		    });


          
            //check if the chamname is in the database
            user = firebase.auth().currentUser;
            
		}
        
        function updateFavLabel(user){
          var chamName = document.cookie;
          fav.child(user.uid).on("value",function(snapshot){
            var data = snapshot.val();
            var flag = false;
            for (var key in data) {
              if(data[key].name == chamName) {
                flag = true;
                break;
              }
            }
            if (flag) document.getElementById("favorite").value = "Un-Favorite";
            else document.getElementById("favorite").value = "Favorite";
          });
        }

		
		function change(){
			user = firebase.auth().currentUser;
			if(user){
				var favButton = document.getElementById("favorite").value;
                var chamName = document.cookie;
              
				if(favButton === "Favorite"){
					alert('Added to Favorites');
					document.getElementById("favorite").value = "Un-Favorite";
					var ref1 = fav.child(user.uid);
                  
                    ref1.push({
                      name: chamName
                    });
				}
				else{
					alert('Removed from Favorites');
					document.getElementById("favorite").value = "Favorite";
                    fav.child(user.uid).on("value",function(snapshot){
                      var data = snapshot.val();
                      for (var key in data) {
                        if(data[key].name == chamName) {
                          var ref1 = fav.child(user.uid).child(key);
                          ref1.remove();
                          break;
                        }
                      }
                    });
				}
			}
			else{
				alert('Not logged in.');
			}
		}