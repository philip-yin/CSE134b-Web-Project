    var cham = firebase.database().ref('Champions');
    var fav2 = firebase.database().ref('Favorites');
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) displayFav(user);
    });
  
    function displayFav(user){
      if(user){
         var ref1 = fav2.child(user.uid);
         if(ref1) {
           ref1.once("value")
            .then(onValue);
          }
      }
    }

    function refresh(list) {
        var lis = '<a href = "'+list[0].profile+ '" onClick = "champInfoSend(' + "'"+ list[0].name + "'" +')"' +'>'+
                   '<figure style = "margin-left: 6%; display:inline-block;">'+
                   '<img src='+list[0].image +' alt="champion" >'+
                   '<figcaption>'+list[0].name+'</figcaption></figure></a>';
        document.getElementById('fav-image').innerHTML += lis;
    }

    var onValue = function(snapshot) {
        document.getElementById('fav-image').innerHTML = '';
        var data = snapshot.val();
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                cham.child(data[key].name).on("value",function(snapshot2){
                  var data2 = snapshot2.val();
                  var list = [];
                      list.push({
                        image: data2["image"],
                        profile: data2["profile"],
                        name: data2["name"]
                      });
                      refresh(list);
                });
            }
        }
    }
	
	function champInfoSend(name){
		document.cookie = name;
    }