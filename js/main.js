import Startup from './startup.js'
window.addEventListener('load', () => {
    const body = document.querySelector('body')
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
        if ( currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
            body.classList.remove('scroll-up');
            body.classList.add('scroll-down');
        }
        if ( currentScroll < lastScroll && body.classList.contains('scroll-down')) {
            body.classList.remove('scroll-down');
            body.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    })


    tryNow.addEventListener('click', handleTryNow)


    function handleTryNow() {
        console.log('dfs')
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
        }, 3)
    }
})