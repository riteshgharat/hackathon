/*website preloader*/
let preloader = document.querySelector('.preloader');
let progress = document.querySelector('.progress');
let b = 0;

window.addEventListener('load', () => {
  location.hash = '';
  progress.value = 100;
  preloader.style.display = 'none';
  document.querySelector('.container .div1').style.animation = "right 2s";
  renderUI();
});

/*function for changing main page images*/
const images = ['/images/bot.gif', '/images/car.gif', '/images/neural_network.gif', '/images/artificial-intelligence-ai.png'];
const mainImg = document.querySelector('.main-img');
mainImg.src = images[0];
let a = 1;

function changeImg() {
  mainImg.src = images[a];
  a++;
  if (a == images.length) a = 0;
}
setInterval(changeImg, 3000);

/*Data for text to speech*/
const data = [
  { title: "What's AI.", info: `In Simple term Artificial intelligence (AI) is the ability of a computer program or a machine to think and learn. It is also a field of study which tries to make computers "smart". They work on their own without being encoded with commands. John McCarthy came up with the name "Artificial Intelligence" in 1955.\n\n In general use, the term "artificial intelligence" means a programme which mimics human cognition. At least some of the things we associate with other minds, such as learning and problem solving can be done by computers, though not in the same way as we do.\n\n At present we use the term AI for successfully understanding human speech, competing at a high level in strategic game systems (such as Chess and Go), self-driving cars, and interpreting complex data. Some people also consider AI a danger to humanity if it continues to progress at its current pace.\n\n AI involves many different fields like computer science, mathematics, linguistics, psychology, neuroscience, and philosophy. Eventually researchers hope to create a "general artificial intelligence" which can solve many problems instead of focusing on just one. Researchers are also trying to create creative and emotional AI which can possibly empathize or create art.
` },
  {
    title: "Machine Learning.",
    info: `Machine learning (ML) is core for AI. It is a type of artificial intelligence (AI) that allows software applications to become more accurate at predicting outcomes without being explicitly programmed to do so. Machine learning algorithms use historical data as input to predict new output values.\n\nRecommendation engines are a common use case for machine learning. Other popular uses include fraud detection, spam filtering, malware threat detection, business process automation (BPA) and Predictive maintenance.\n\nMachine learning is important because it gives enterprises a view of trends in customer behavior and business operational patterns, as well as supports the development of new products. Many of today's leading companies, such as Facebook, Google and Uber, make machine learning a central part of their operations. Machine learning has become a significant competitive differentiator for many companies.`
  },
  {
    title: "Selfdriving Car.",
    info: `A driverless car (also called autonomous car or self-driving car, i.e. self-operating) is a vehicle that can perform certain tasks on its own, without the help of a human driver. The car uses sensors to analyze its environment, and doesn't need a human's help for certain tasks These tasks commoly include parking the car, driving while keeping the same lane on a highway or driving at a predefined speed. In public places, certain buses have been programmed to travel a given route. As of 2022, self-driving cars have been used in controlled envirnoments more and more. An example of this might be buses that transfer passengers between airport terminals. \n\n Typical sensors used by a self-driving vehicle include lidar, digital cameras, GPS and IMU.\n\nHigh-definition maps can be used to accurately locate a self-driving car in a place, and to give information about parts of a road not seen by the car. \n\nAutonomous Cars use a combination of Computer Vision and LiDAR to detect pedestrians and Stop Signs when driving passengers.`
  },
  { title: "Chat bots.", info: `AI chatbot can comprehend natural language and respond to people online who use the "live chat" feature that many organizations provide for customer service. AI chatbots are effective with the use of machine learning, and can be integrated in an array of websites and applications. AI chatbots can eventually build a database of answers, in addition to pulling information from an established selection of integrated answers. As AI continues to improve, these chatbots can effectively resolve customer issues, respond to simple inquiries, improve customer service, and provide 24/7 support. All in all, these AI chatbots can help to improve customer satisfaction.` }
  ];

/*rendering data on website*/
const aboutCon = document.querySelector('.about-container .info');
const mlCon = document.querySelector('.ml-container .info');
const cvCon = document.querySelector('.cv-container .info');
const cbCon = document.querySelector('.cb-container .info');

function renderUI() {
  aboutCon.innerText = data[0].info;
  mlCon.innerText = data[1].info;
  cvCon.innerText = data[2].info;
  cbCon.innerText = data[3].info;
}
/*text to speech api*/
var voiceList = document.querySelector('#voiceList');
var stopBtn = document.querySelector("footer .div1 .stop");
var synth = window.speechSynthesis;
var voices = [];

//cheching for support of text to speech api in users browser
if (synth) {
  //story telling mode
  function explore() {
    location.hash = '';
    start = setInterval(story, 1000);

    function story() {
      if (location.hash == '' && !synth.speaking) { speak1() }
      if (location.hash == '#what_is_ai' && !synth.speaking) { speak2() }
      if (location.hash == '#machine_learning' && !synth.speaking) { speak3() }
      if (location.hash == '#self_driving_car' && !synth.speaking) { speak4() }
      if (location.hash == '#chatbot' && !synth.speaking) {
        location.hash = 'feedback';
        startSpeak(`Thank you for listening us. Please provide us valueable feedback`, aboutCon)
      }
      if (location.hash == '#feedback' && !synth.speaking) { stopVoice() }
    }
  }

  //single paragraph mode
  function speak1() {
    location.hash = 'what_is_ai';
    startSpeak(`${data[0].title} ${data[0].info}`, aboutCon);
  }

  function speak2() {
    location.hash = 'machine_learning';
    startSpeak(`${data[1].title} ${data[1].info}`, mlCon);
  }

  function speak3() {
    location.hash = 'self_driving_car';
    startSpeak(`${data[2].title} ${data[2].info}`, cvCon);
  }

  function speak4() {
    location.hash = 'chatbot';
    startSpeak(`${data[3].title} ${data[3].info}`, cbCon);
  }

  //getting text to speech voices from local machine 
  function PopulateVoices() {
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice) => {
      var listItem = document.createElement('option');
      listItem.textContent = voice.name;
      listItem.setAttribute('data-lang', voice.lang);
      listItem.setAttribute('data-name', voice.name);
      voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
  }

  PopulateVoices();
  if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = PopulateVoices;
  }

  function startSpeak(txt, container) {
    synth.cancel();
    renderUI();
    var toSpeak = new SpeechSynthesisUtterance(txt);

    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
      if (voice.name === selectedVoiceName) {
        toSpeak.voice = voice;
      }
    });

    synth.speak(toSpeak);
    stopBtn.style.display = 'block';

    toSpeak.addEventListener('boundary', function(event) {
      container.innerHTML = addMark(toSpeak.text, event.charIndex);
    });
  }
  //stop function for text to speech
  function stopVoice() {
    synth.cancel();
    renderUI();
    stopBtn.style.display = 'none';
    clearInterval(start);
  }

  //highlights text function
  function addMark(txt, position) {
    let sentence1 = txt.slice(0, position).split(' ');
    sentence1.shift();
    sentence1.shift();

    let sentence2 = (txt.slice(position, txt.length)).split(' ');

    let sentence = `<mark>${sentence1.join(' ')}</mark> ${sentence2.join(' ')}`;
    return sentence
  }
}

//if text to speech not available
else {
  document.querySelectorAll('.speak').forEach(speak => speak.style.display = 'none');
  voiceList.style.display = 'none';
  alert("Your browser is not supported for Text to speech api. please try on other browser");
}


/*function for sending feedback*/
function send() {
  var body = document.querySelector('#feedback-txt').value;
  if (body && body.length > 10) {
    location.href = `mailto:riteshgharat05@gmail.com?subject=AI Page Feedback&body=${body}`;
    console.log('mail send successfully!');
    body = '';
  }
}