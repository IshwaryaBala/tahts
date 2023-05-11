galery = document.querySelector('#galery')
for (let i = 0; i < 200; i++) {
  img1 = document.createElement('IMG')
  img1.src = 'assets/img/pictures/2019-day1' + i * 4 + '/200/100'
  img1.setAttribute('alt', img1.src)
  img1.classList.add('img1')
  galery.appendChild(img1)
}