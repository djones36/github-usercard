/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

https://api.github.com/users/djones36

axios.get('https://api.github.com/users/djones36')
  .then(user => {
    console.log('User Info' ,user)
    const cards = document.querySelector('.cards')
    cards.appendChild(grandCardCreator(user.data));
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get('https://api.github.com/users/djones36/followers')
  .then(userdata => {
    const followerData = userdata.data;
    followerData.forEach(followData => {
      followersArray.push(followData.login)
    })

    followersArray.forEach(follower => {
      axios.get(`https://api.github.com/users/${follower}`)
        .then(userData => {
          console.log('Follower info: ', userData.data);
          const followerCard = document.querySelector('.cards');
          followerCard.appendChild(grandCardCreator(userData.data));
        })
    })
  })



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
let cards = document.querySelector('.cards')

function grandCardCreator(element){
  //created classes
  let divParent = document.createElement('div');
  let img = document.createElement('img');
  let cardInfo = document.createElement('div');
  let name = document.createElement('h3');
  let userName = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let profileAtag = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');
  //create class
  divParent.classList.add('card');
  name.classList.add('name');
  userName.classList.add('userName');
  //append child
  divParent.appendChild(img);
  divParent.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(profileAtag);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  //textcontent
  location.textContent = `Location: ${element.location}`;
  name.textContent = element.name;
  img.src = element.avatar_url;
  userName.textContent = element.login;
  const profileLink = element.html_url;
  profileAtag.innerHTML = `Profile Link: ${profileLink.link(element.url)}`;
  followers.textContent = `Followers: ${element.followers}`;
  following.textContent = `Following: ${element.following}`;
  bio.textContent = `Bio: ${element.bio}`;

  return divParent;
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
