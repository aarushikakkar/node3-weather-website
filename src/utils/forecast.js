const request=require('request');
const forcast=function(longitude,latitude,callback){
const url='https://api.darksky.net/forecast/281502b878008174708b682b04e7323f/'+longitude+','+latitude;

request({url:url,json:true},function(error,response)
{
  if(error)
  {
    callback('unable to connect to weather service',undefined);
  }
  else if(response.body.error)
  {
    callback('unable to find location',undefined);
  }
  else {
    callback(undefined,response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degress out. There is a '+response.body.currently.precipProbability+' % chance of rain.')
  }
})
}
module.exports=forcast
