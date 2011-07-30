var userCounter = 1;

UserProvider = function(){};
UserProvider.prototype.dummyData = [];

UserProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

UserProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

UserProvider.prototype.save = function(users, callback) {
  var user = null;

  if( typeof(users.length)=="undefined")
    articles = [users];

  for( var i =0;i< users.length;i++ ) {
    user = users[i];
    user._id = userCounter++;
    user.created_at = new Date();

    this.dummyData[this.dummyData.length]= user;
  }
  callback(null, users);
};

/* Lets bootstrap with dummy data */
new UserProvider().save([
  {firstname: 'Amel', lastname: 'HAFSA', email:'hafsa.amel@gmail.com'},
  {firstname: 'Amel1', lastname: 'HAFSA1', email:'hafsa.amel@gmail.com1'},
  {firstname: 'Amel2', lastname: 'HAFSA2', email:'hafsa.amel@gmail.com2'}
], function(error, users){});

exports.UserProvider = UserProvider;