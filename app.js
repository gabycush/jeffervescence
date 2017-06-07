const app = {
  flicks: [],

  init(formSelector){
    this.max = 0
    document.querySelector(formSelector).addEventListener('submit', this.addFlick.bind(this))
  },
  addFlick(ev){
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id:this.max + 1,
      name:f.name.value,
    }
    this.flicks.push(flick)
    ++this.max
    const listItem = this.renderListItem(flick)
    this.renderList(listItem)
    f.name.value = ' '
  },
  renderListItem(flick){
    const item = document.createElement('li')
    const promote = document.createElement('button')
    promote.innerHTML = '<img src="star1.png" alt="promote" />'
    promote.setAttribute('class', 'promote')
    const del = document.createElement('button')
    del.innerHTML = '<img src="trash.png" alt="delete" />'
    del.setAttribute('class', 'del')
    const up = document.createElement('button')
    up.innerHTML = '<img src="up.png" alt="up" />'
    up.setAttribute('class', 'up')
    const down = document.createElement('button')
    down.innerHTML = '<img src="down.png" alt="down" />'
    down.setAttribute('class', 'down')
    item.innerHTML = flick.name
    item.appendChild(del)
    item.appendChild(down)
    item.appendChild(up)
    item.appendChild(promote)
    return item
  },
  renderList(item){
    const list = document.querySelector('#flick-list')
    list.insertBefore(item, list.childNodes[0])
    const buttons = item.childNodes
    this.addListeners(buttons)
  },

  addListeners(buttons){
     //button 0 is just the movie name
     buttons[1].addEventListener('click', this.delItem) //deleteButton
  //   buttons[2].addEventListener('click', moveItemDown) //downButton
  //   buttons[3].addEventListener('click', moveItemUp) //upButton
     buttons[4].addEventListener('click', this.promoteItem) //promoteButton
  },

  delItem(ev){
    const button = ev.target.parentElement
    const li = button.parentElement
    li.outerHTML = ''
  },
  //
  // moveItemDown(ev){
  //
  // },
  //
  // moveItemUp(ev){
  //
  // },

  promoteItem(ev){
    let button = ev.target
    console.log(button)
    if(button.getAttribute('src') == 'star1.png'){
      button.setAttribute('src', 'star.png')
      button.style.backgroundColor = 'white'
    }
    else{
      button.setAttribute('src', 'star1.png')
    }
  },

}

app.init('#movieForm')
