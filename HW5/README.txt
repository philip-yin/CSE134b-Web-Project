LeagueDex

Link: https://leaguedex.firebaseapp.com/hw5/wireframes/index.html


LeagueDex is a web application that allows a user to sign up for an account through email or google and allows them to favorite their champions for easy access.
Champions that are currently listed in LeagueDex's database are displayed on the home page. In the favorites tab, there are two views : List view and image view.
The list view allows you to enter in a champion that is displayed on the homepage and add them to your favorites. The image view displays the images for these
favorited champions. The profile page for each champion also has a favorites button that allows you to add that champion to your favorites list. The favorite button
will turn into an unfavorite button once it is in your list. Each champion also has information about its statistics, abilities, masteries, item build, runes, threats,
and skins with links to each on the profile page.


Code Architecture


1. "common.js" is the javascript file common to all the web pages for our application. This mainly is just for the navigation bar on top of every page, which displays whether
the user is signed in or not, and if so, allows them to signout no matter what page they are on. This also stores a name variable to the cookie that is saved and used throughout
the application

2. "favorites_1.js" is the javascript file for the image list view of a user's favorited list. This file includes functions to display the image list and refreshes the list
upon any updates occuring to the list (insert or delete)

3. "favorites_2.js" is similar to favorites_1.js but instead of image list displayed, it is a text list displayed. This script also allows you to delete champions from your list
with delete buttons next to each name displayed. There is also a function that allows you to save champions to your list given a text entry field.

4. "home.js" has a function called when the home page is loaded that displays all the champion images and names stored in the database.

5. "login.js" handles all the functions needed for a user to login. It handles and checks to see if the correct email and password is used to sign in and also handles
google signin function. It also has a function that directs the user to home page upon successful login.

6. "profile.js" has a function that updates the favorite's button when clicked. It also has functions that handle which champion profile its on, and displays the champion
information accordingly.

7. "signup.js" is similar to login. It has a function that makes sure the user is entering in a correctly formatted email and password. Once successfully signed up, it has
a function that directs the user to the home page.

8. "stats.js" is a script that tells us what numbers to display in respect to the level that the user selects.

9. For the html files, the name of each file tell you which page of the website that it is for.


File organization


1. The main directory of the project holds all the html pages for the application.

2. In the champions folder are directories that link to each champion in the database. In each champion's folder, there are sub-folders that store the images for the 
champion's item build, masteries, skins, and threats.

3. CSS and Javscript files are stored in their own folders.

4. The pics folder are all the pictures that are commonly used for each champion. Currently only the runes pictures are in this folder because runes are common for everyone
throughout the game.



Limitations / TODO's

Because there are over one hundred champions that exist in League of Legends, it would be too much for us to manually get the pictures of all these champions and store it into the
Firebase database. Along with all the champions that we haven't stored in the database, the information and images we need to get for each champion would be too much for us 
to input them all in manually. For example, in the statistics page, there are eighteen levels and for each level the numbers for each category vary. There are twelve categories,
so that would mean we would have to take into account 18*12 = 216 numbers for a single champion. By using firebase database and entering in each number individually, it couldn't  
be done, given the time we had. So for each category of information, the same information is displayed for each champion. An example, is that for skins category, the user will
see the same five pictures even if they go to a different champion. 



