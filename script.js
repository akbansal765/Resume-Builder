const buttons = document.querySelectorAll('.btn');
console.log(buttons);

buttons.forEach(btn => btn.addEventListener('click', function(){

    setTimeout(() => {
        btn.style.backgroundColor = '#4B4646';
    }, 10)
    btn.style.backgroundColor = 'white';

}))