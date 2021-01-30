// add forgot password => DONE
//? add sign with google and facebook
// add the ability to send emails to confirm users emails =>DONE
// add accepting chat before the ability to type into it =>DONE
// add delete chat =>DONE
// add updating my infos =>DONE
//? think about how to notify users when new message come
//? -- this may be when adding listeners to a different place
//? -- like running listeners right after the program starts
//? adding the events for notifying me that a person added me to his chats
//? add the final responsive designs (full sidebar and full chatBox with back button at the top)
//? users can visit others profile and send them friend requests before chatting them
//? after sending them friend requests they will be on their friend list
//? the message sender user can then chat them with his real identity or fake one
//? but he can't chat a user that isn't a friend
//? let non verified-email users login to a page that they can request for another email verification message
//! The app candidate names (Who - )

// add addFriends Route in frontend

//! my app default theme will be the glassy with blue violet and pink colors
//! -- or similar colors
//* IMPORTANT
//! the styles file in each Component will take care of choosing the styles for each theme
//! -- styles file will check for the theme name and then replace the styles object in
//! -- the makeStyles function with the needed style object
//* IMPORTANT

//! admin account that will chat other users with no blocks or restrictions
//! -- this account won't be just a normal one , it Will be an admin control panel
//! -- the admin will login using a different login screen and a different link (not '/login')
//! -- and he will will control the website will it by removing messages or users adding new users ...etc
//! -- when sending a message with this email
//! -- a new room will be created and accepted
//! -- and the message will be sent
//! -- messages from contact me page will go in that admin control panel
// add contact me page => DONE

// (this a testing step => it may have errors or modifications
//? this step may be put in the client side in the future in case of errors or need to make instant dayMessages
// add the messages time line) = >DONE

//! add a prop to every user called rooms
//! --it will be an array of objects
//! --each object will have a reference to the room
//! --and the the other user in that room
//! --and the number of unread messages in that room
//! --which will be automatically updated just like the last message in the room by the messages model
//!
//!
// to make a message delivered two things will happen
// -- 1] when the user signs in mark all his messages that he is the receiver in it as delivered and then emit
// -- from server that this user has delivered all his messages
// -- 2] when the message is sent and the user has onlineId on the server emit an event with user delivered this message
// to make the message read i will use that trick when user open my room he will emit an event that will mark all messages as read
// -- the server will update all messages of this room to be read and if the other user is online
// -- server will emit an event to him and the client will will update the messages to be read without
// -- getting them from the server
// fix the last seen at (today, yesterday, last + day) at HOUR:MINUTE PM || AM
// -- by adding a custom function that handle this action and return the result
// when user asks for room messages, mark these messages as read
// split messages that will be shown to messages from server and they won't be changed
// -- and messages that came instantly from socket.io
// -- and when updating, just update socket.io messages
// 1] add reducer for the currently chatting user data =>DONE
// i will use this reducer to view current user data =>DONE
// 2] add upload user photo =>DONE
// 3] add sign up with google and facebook
// 4] when clicking x button that cancel uploading photo
// -- Delete that photo also from server
//

// (handle typing => DONE
// for handling typing and online status
// we will care only about the current open room
// we will emit an event for all users with the online user
// if the user id matches the userToShowOnRoom of the currentOpenRoom then we update his status
// handling real time blocking and unblocking =>DONE
// add currentOpenRoomId and fetch room data each time you open new room =>DONE
// fetch it from the server not from local rooms =>DONE
// but first make V4 backup =>DONE) =>DONE

// (handle all of that from server
// --when user send message.. after creating it on database emit an event with the newly created message
// -- when creating a new chat emit ..
// but do that after backing the project up and test how to send a message to user with his id using socket.io (TEST IT FIRST)
//
//
//  Tomorrow will be refactoring the code to send sockets from server while updating database
//  and store users socket ids on server and if they have one they will be online
//  but do that after backing the project up and test how to send a message to user with his id using socket.io (TEST IT FIRST)
// )=>DONE
