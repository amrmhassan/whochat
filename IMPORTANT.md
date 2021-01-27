# implement good validation for forms

# implement good error message from server

# add ip address of the user when signing up and with every login

# implement that => when adding new user as friend go to new page of friends

# implement the ability to recognize emails from regular names

# show the most near 10 users to me using Geospatial data from mongoose

# the user can search another users using their names or their emails

# while searching show the nearest users first

# add the property lastLoginIp

# the code to get ip in node

let ip =
req.headers['x-forwarded-for'] ||
req.connection.remoteAddress ||
req.socket.remoteAddress ||
(req.connection.socket ? req.connection.socket.remoteAddress : null);

# end of ip code

# implement that => no one can use my api except my frontend
