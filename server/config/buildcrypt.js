/*
  Hey you! This might be a unecessary file considering if you got access to it
  you got access already. But hey! Fun anyways
*/


  const fs = require('fs');
  const bcrypt = require('bcryptjs');
  const path = require('path');
  console.log(process.argv);

  const saltRounds = 10;
  const password = process.argv[2];

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  fs.appendFile(path.resolve(__dirname, './crypt/crypt.txt'), hash, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
