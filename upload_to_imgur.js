const imgur = require('imgur');
imgur.setClientId('2ce55c3b8fb0ca4');
imgur.setAPIUrl('https://api.imgur.com/3/');

imgur
  .uploadFile('./sample_green.jpg')
  .then(function (json) {
      console.log(json.data.link);
  })
  .catch(function (err) {
      console.error(err.message);
  });
