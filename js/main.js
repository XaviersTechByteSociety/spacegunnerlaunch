import Startup from './startup.js';

window.addEventListener('load', () => {
    const body = document.querySelector('body');
    const section = document.querySelectorAll('.section');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const card = document.querySelector('.card');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZasdfghjklZxcvbnmqwertyuiop";
    const description = document.querySelector('.description > p');
    const tryNow = document.querySelector('#try-now');
    let lastScroll = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 0) {
            body.classList.remove('scroll-up');
        }
        if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
            body.classList.remove('scroll-up');
            body.classList.add('scroll-down');
        }
        if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
            body.classList.remove('scroll-down');
            body.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    })


    if (tryNow) {
        tryNow.addEventListener('click', (e) => {
            e.stopPropagation();
            handleTryNow();
        });
    }
    section.forEach(section => section.addEventListener('click', cancelTryNow));

    function createNotification(noti)  {
        const card = document.createElement('div');
        card.id = 'noti-card';
        card.style.width = '100px';
        card.style.padding = '20px'; // Add padding
        card.style.border = '2px solid cyan'; // Card border
        card.style.borderRadius = '8px'; // Rounded corners
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Card shadow
        card.style.background = '#000'; // Card background color
        card.style.textAlign = 'center'; // Center the content
        card.style.color = 'cyan'; // Text color
        card.style.position = 'absolute';
        card.style.bottom = '10px';
        card.style.right = '10px';
        card.innerText = noti;
        card.style.zIndex = '400';


        body.appendChild(card);
    }

    function createOptionsHtml() {
        // Create the main card container
        const box = document.createElement('div');
        box.id = 'optionsCard';
        box.classList.add('card-box', 'z-100'); // Add a class for styling
        box.style.width = '300px'; // Set a width for the card
        box.style.padding = '20px'; // Add padding
        box.style.border = '2px solid cyan'; // Card border
        box.style.borderRadius = '8px'; // Rounded corners
        box.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Card shadow
        box.style.background = '#000'; // Card background color
        box.style.textAlign = 'center'; // Center the content
        box.style.color = 'cyan'; // Text color

        // Create the message to display in the card
        const message = document.createElement('p');
        message.classList.add('z-100');
        message.textContent = 'Choose an option to continue';
        message.style.marginBottom = '20px'; // Space between message and buttons
        box.appendChild(message);

        // Create "Continue as Guest" button
        const guestButton = document.createElement('button');
        guestButton.classList.add('z-100');
        guestButton.textContent = 'Continue as Guest';
        guestButton.style.margin = '10px';
        guestButton.style.padding = '10px';
        guestButton.style.background = 'transparent';
        guestButton.style.border = '2px solid cyan';
        guestButton.style.color = 'cyan';
        guestButton.style.cursor = 'pointer';
        guestButton.addEventListener('click', () => {
            // Add functionality for guest button here
            
            // window.location.href = 'https://space-gunner.netlify.app/';
        });
        
        // Create "Register" button
        const registerButton = document.createElement('button');
        registerButton.classList.add('z-100');
        registerButton.textContent = 'Register';
        registerButton.style.margin = '10px';
        registerButton.style.padding = '10px';
        registerButton.style.background = 'cyan';
        registerButton.style.border = '2px solid cyan';
        registerButton.style.color = 'black';
        registerButton.style.cursor = 'pointer';
        registerButton.addEventListener('click', () => {
            // Add functionality for register button here
            window.location.href = 'https://space-gunner.netlify.app/signup/signup.html';
        });

        // Add buttons to the card
        box.appendChild(guestButton);
        box.appendChild(registerButton);
        
        // Append the card to the body or a container
        document.body.appendChild(box);
    }
    



    function handleTryNow() {
        createOptionsHtml();
        section.forEach(section => section.classList.add('blur'));
    }
    function cancelTryNow() {
        const card = document.querySelector('#optionsCard');
        if (card) {
            card.remove()  // Clears all content inside the card
        }
        section.forEach(section => section.classList.remove('blur'));
    }





    const startup = new Startup(canvas, ctx);
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startup.render(deltaTime);
        requestAnimationFrame(animate);
    }
    animate();
    hackerText()
    function hackerText() {
        let count = 0;
        let intervalID = null;
        intervalID = setInterval(() => {
            if (description) {
                description.innerText = description.innerText.split('').map((letter, index) => {
                    if (index < count) {
                        return description.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * (letters.length - 1))];
                }).join('');
    
                count += 1 / 3;
    
                if (count >= description.dataset.value.length) {
                    clearInterval(intervalID);
                }
            }
        }, 3)
    }
})