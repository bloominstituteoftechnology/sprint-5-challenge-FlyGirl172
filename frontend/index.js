async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // Define an async function to fetch data from both endpoints.
async function fetchData() {
  try {
    const learnersResponse = await axios.get('http://localhost:3003/api/learners');
    const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');

    const learnersData = learnersResponse.data;
    const mentorsData = mentorsResponse.data;
    //console.log(mentorsData);

    // Combine data from both endpoints to create the desired data structure.
    const combinedData = learnersData.map((learner) => {
      const mentors = learner.mentors.map((mentorId) => {
        // console.log(mentorId)

        const mentor = mentorsData.find((m) => m.id === mentorId);
        // console.log(mentor)
        return (mentor)
      });
      //  console.log(mentors)
      
      return {
        id: learner.id,
        email: learner.email,
        fullName: learner.fullName,
        mentors,
      };
    });
    // console.log(combinedData);

    return combinedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Define a function to create and append a learner card to the DOM.
function createLearnerCard(learner) {
  const card = document.createElement('div');
  card.classList.add('card');

   const learnerEmail = document.createElement("div")
   learnerEmail.textContent = learner.email
   
    const h3 = document.createElement('h3');
  h3.textContent = learner.fullName;

    // const leanerId = learner.id 
  //  console.log(card.className);

  const h4 = document.createElement('h4');
  h4.classList.add('closed');
  h4.textContent = 'Mentors';

  const ul = document.createElement('ul');
  learner.mentors.forEach((mentorObject) => {
    // console.log(mentorObject);
    const li = document.createElement('li');
    li.textContent =`${mentorObject.firstName} ${mentorObject.lastName}`
    ul.appendChild(li);
  });
  
  card.appendChild(h3);
  card.appendChild(learnerEmail);
  card.appendChild(h4);
  card.appendChild(ul);
  //card.appendChild(li);


  // Add a click event listener to toggle the 'open' and 'closed' class of the card.
  card.addEventListener('click', (evt) => {
    card.classList.toggle('selected');
    h4.classList.toggle('open');
    h4.classList.toggle('closed');
    h3.textContent = learner.fullName + `, ID ${learner.id}`;
console.log(evt.target);
  });

  document.querySelector('.cards').appendChild(card);
}

// Call the fetchData function and render learner cards when data is available.
fetchData().then((data) => {
  if (data.length > 0) {
    const loadingMessage = document.querySelector('.info');
    loadingMessage.style.display = 'none';

    data.forEach((learner) => {
      createLearnerCard(learner);
    });
  } else {
    const loadingMessage = document.querySelector('.info');
    loadingMessage.textContent = 'Failed to fetch learner data.';
  }
});


  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
