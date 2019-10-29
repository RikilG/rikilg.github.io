var menuItems = document.getElementsByClassName('menuItem')

for (var i = 0; i < menuItems.length; ++i) {
    menuItems[i].addEventListener('click', function () {
        var selected = document.getElementsByClassName('selected')
        selected[0].classList.remove('selected')
        this.classList.add('selected')
    })
}