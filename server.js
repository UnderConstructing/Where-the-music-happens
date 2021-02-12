//IMPORTS
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000

const mongoose = require('mongoose')
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

//MIDDLEWARE
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))

if (process.env.NODE_ENV === 'production') {
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
  

const expressSession = require('express-session')
app.use(expressSession({
    secret: "itsasecret",
    resave: true,
    saveUninitialized: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser("itsasecret"))

const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())


app.use(require('./routes'))




const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

server.listen(PORT, () => console.log("server listening on port:", PORT))

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})


/*
*******todo for saving:
1: Create user schema storing by row arrays, label each row to track indices
2: Create axios fetch call to send arrays and username from authContext back for saving.
3: On backend route, find the user using the username authContext
4: Then, using array bracket notation, seperate the request melody and bass arrays into rows, and
    save the snare, kick, hihat and crash/clap/whatever to variables.
5: Push the respective rows to their corresponding array fields (row1Melody request item to RowOneMelody
    field in the User Schema).
6: Send response from route to frontend to trigger modal popup saying "you've saved a sequence!"

QUESTION: Mongoose seems to struggle with dimensional arrays, is there a better work around for this?
I can get subdocuments working, but my experiments with multiple subdocuments havent worked.

*******todo for retrieving all saved sequences.
1: On the frontend, make axios call with a username to retrieve the various sequencer array fields.
2: On backend, get all rows and instrument fields by findOne method using req.body.username.
3: On the backend, assemble full grid arrays something like as follows:
    find user{
        let allMelodyArrays = []
        for(i=0; i = melodyRowOne.length, i)
 {
        let pushedMelodyArray = []
        MelodyArray.push(user.melodyRowOne[i]
        MelodyArray.push(user.melodyRowTwo[i]
        MelodyArray.push(user.melodyRowThree[i]
        MelodyArray.push(user.melodyRowFour[i]
        MelodyArray.push(user.melodyRowFive[i]
        MelodyArray.push(user.melodyRowSix[i]
        MelodyArray.push(user.melodyRowSeven[i]
        MelodyArray.push(user.melodyRowEight[i]
        allArray.push(pushedMelodyArray)
    }
}
    *DO THIS FOR ALL THE INSTRUMENTS!!!!*
4: Once all rows have been pushed at all indices to the all____Arrays corresponding to the type,
    send all of them in the response object.
5: On the front end, create a div in the Saved Sequences part of the profile for each of the indices
    in each array.
6: When one of the divs is clicked, use that stored set of arrays to render the sequencer (may need
    to make a separate axios call, in which case, the index number should be stored as a prop of each
    div, so that the for loop code on step three just gets the stored req.body number as the index.
    Then, same process for res. Send the res object including arrays for all instruments, then render
    the sequencer using that).

QUESTION: Should we store the create new sequence as a default at index zero of all the arrays, that way it
can be handle in one api call? Or is it better/more performant to do the blank sequence as a json file like
I have it?

*******todos for sequencer.
1: In css, figure out how to add the display: none property to each instrument, so that instruments can be
    hidden and the display more readable.
2: In css-grid, figure out how to display rows and columns so that buttons and labels may be added to
    each row without messing up the sequencer display. Also, included in this is a responsivity problem,
    but worst case scenario we media query everything.
3: Same deal for the chat modal. Set a fixed position for it in css, then let it minimize and maximize.
4: Animations on playSequence. This might be a nightmare, hopefully getAnimationFrames and Tone.Draw will work, and
    I can just ::before or ::after it. Alternative solutions would be to set up a new component display
    on "playSequence" that triggers animations at the same time. Sounds like a performance nightmare though.
    Could also compromise and do a div that animates one of the sequences waveform (shouldn't be too bad.)
    Anyway, that will be a problem.
*******todos for chat
1: hook up so that it works globally, probably a problem with the websocket server hookups, not sure.
2: set up chat room feature, so that the local user authContext only include the two users that are logged in
    chatting. This will require creating two separate users in mongoose, then logging in to both of them in
    two chrome incognito tabs to test. Easy enough to do the mongoose stuff, because the register user route
    works. the tricky thing that I don't understand is the authContext/chat rooms stuff, because I can't
    even get it to work as a global emit in socket. Heck, I can't even get it to connect properly.

*******todos for folder organization
1: Check to see if my components can be divied up further. So much of this is only used once per page,
    I am hip to separation of concerns but I also struggle to separate when the functionality seems so
    tied up together (looking at you, sequencer.js)
2: Separate out routes from server. I started doing it this way, but the passport.js authentication and
    localStrategy didn't export properly, so I did it all on one page, because that way I could get it
    to work.
3: Utils, contexts, etc. Context is the hardest one for me, because I feel like I might have done it in
    a dumb way. 404 route displays after login, before sequencer component renders (auth context takes a
    a second to store, I think). Solutions for that?
4: Separate out the css files for their respective components. Shouldn't be to bad. I can go label stuff
    in comments ont the app.css file.
*/