How to a Login in FireBase with Google
a) FireBase Setup https://console.firebase.google.com/
b) Copy/Paste firebase config file
c) Write the Code for Authentication


Learn API's
 const auth = getAuth(); // FireBase Auth
    // Need to Specify the Provider
    const provider = new GoogleAuthProvider(); // Google Authentication Provider
    try{
    const result = await signInWithPopup(auth, provider);


    If i am writing my Authentication
    a) Make a Connection with DB (Using Driver)
    b) Make Queries (Query Language) (Check Userid and Password in DB)
    c) collect the result and convert into JS Object
    d) Connection close

d) Authentication is done async (await)
e) Store user info in localStorage (Domain Specific) so we can get the user info in other pages
f) Redirect to the dashboard page
g) Dashboard has 2 Activity 
i) Add a Question
ii) View All Question