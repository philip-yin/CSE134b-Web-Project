	var fav  = firebase.database().ref('Favorites');
    var cham = firebase.database().ref('Champions');
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) displayFav(user);
    });
  
    function displayFav(user){
      if(user){
         var ref1 = fav.child(user.uid);
         if(ref1) {
           ref1.once("value")
            .then(onValue);
          }
      }
    }
  
    function saveToList(event) {
        user = firebase.auth().currentUser;
        if(user){
            //when user press the enter key
            if (event.which == 13 || event.keyCode == 13) { 
                var chamName = document.getElementById('chamName').value;
                cham.once("value", function(snapshot) {
                  if(snapshot.child(chamName).exists()){
                    var ref1 = fav.child(user.uid);
                    ref1.once("value", function(snapshot2){
                      if(snapshot2.exists()){
                        var data = snapshot2.val();
                        var flag = false;
                        for (var key in data) {
                          if(data[key].name == chamName) {
                            flag = true;
                            break;
                          }
                        }
                        if(!flag) {
                          ref1.push({
                            name: chamName
                          });
                          ref1.on("value", onValue);
                        }
                        else{
                          alert("Re-Favorite Existed Champion");
                        }
                      }
                      else{
                        ref1.push({
                          name: chamName
                        });
                        ref1.on("value", onValue);
                      }
                    });  
                  }else{
                    alert("Not a Valid Champion Name!");
                  }
                });
                document.getElementById('chamName').value = '';
                return false;
            }
        }
        else{
            alert("Not logged in");
        }
    }

    function refresh(list) {
        var lis = '';
        for (var i = 0; i < list.length; i++) {
            lis += '<li>' + list[i].name + '  <button style="margin-left:7px;border-radius:5px;border: 1px solid;" onclick ="deleteFav(\''+list[i].key+'\')">X</button>'+'</li>';
        }; 
        document.getElementById('fav').innerHTML = lis;
    }

    function deleteFav(key){
        user = firebase.auth().currentUser;
        var delRef = fav.child(user.uid).child(key); 
        delRef.remove();
        fav.child(user.uid).on("value", onValue);
    }

    var onValue = function(snapshot) {
        var data = snapshot.val();
        var list = [];
        for (var key in data) {
			console.log(key);
			console.log(data);
            if (data.hasOwnProperty(key)) {
                list.push({
                    name: data[key].name,
                    key: key
                });
            }
        }
        refresh(list);
    }