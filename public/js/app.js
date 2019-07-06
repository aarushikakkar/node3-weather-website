console.log('client side');
// fetch('http://puzzle.mead.io/puzzle').then(function(response){
//   response.json().then(function(data){
//     console.log(data);
//   })
// })

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

weatherForm.addEventListener('submit',function(e){
  messageOne.textContent='loading...';//used to inject data to browser
  messageTwo.textContent=' ';//used to inject data to browser
  e.preventDefault();//prevent the refreshing of default values means if we write anythig in locatiomn then it wont clear and stay on that input field
  const location=search.value
  fetch('http://localhost:3000/weather?address='+location).then(function(response){
    response.json().then(function(data){
      if(data.error)
      {
        console.log(data.error);
        messageOne.textContent=data.error;
      }
      else
      {
        messageOne.textContent=data.location;//used to inject data to browser
        messageTwo.textContent=data.forcast;//used to inject data to browser
        console.log(data.location);
        console.log(data.forcast);
      }
    })
  })
  console.log(location);
  console.log('testing');
})
