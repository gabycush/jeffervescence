const app = {
  flicks: [],
  flickLi: [],

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
    ++this.max
    this.flicks.push(flick)
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
    item.setAttribute('class', `${this.flicks.indexOf(flick)}`)
    item.appendChild(del)
    item.appendChild(down)
    item.appendChild(up)
    item.appendChild(promote)
    this.flickLi.push(item)
    const buttons = item.childNodes
    this.addListeners(buttons)
    return item
  },
  renderList(){
    const list = document.querySelector('#flick-list')
    for(var i=this.flickLi.length-1; i>=0; i--){
      this.flickLi[i].setAttribute('class', `${i}`)
      list.appendChild(this.flickLi[i])
    }
  },

  addListeners(buttons){
     //button 0 is just the movie name
    buttons[1].addEventListener('click', this.delItem.bind(this)) //deleteButton
    buttons[2].addEventListener('click', this.moveItemDown.bind(this)) //downButton
    buttons[3].addEventListener('click', this.moveItemUp.bind(this)) //upButton
    buttons[4].addEventListener('click', this.promoteItem) //promoteButton
  },

  delItem(ev){
    const list = document.querySelector('#flick-list')
    const button = ev.target.parentElement
    const li = button.parentElement
    list.removeChild(li)
    let index = li.getAttribute('class')
    index = Number(index)
    this.flicks.splice(index, 1)
    this.flickLi.splice(index, 1)
    this.renderList()
  },

  moveItemDown(ev){
    const button = ev.target.parentElement
    const li = button.parentElement
    let index = this.flickLi.indexOf(li)
    index = Number(index)
    const swapIndex = index - 1
    if(swapIndex >= 0){
      const swapElem = this.flickLi[index]
      this.flickLi[index] = this.flickLi[swapIndex]
      this.flickLi[swapIndex] = swapElem
      this.flicks[index] = this.flicks[swapIndex]
      this.flicks[swapIndex] = swapElem
      this.renderList()
    }
  },

  moveItemUp(ev){
    const button = ev.target.parentElement
    const li = button.parentElement
    let index = this.flickLi.indexOf(li)
    index = Number(index)
    const swapIndex = index + 1
    if(swapIndex < this.flickLi.length){
      const swapElem = this.flickLi[index]
      this.flickLi[index] = this.flickLi[swapIndex]
      this.flickLi[swapIndex] = swapElem
      this.flicks[index] = this.flicks[swapIndex]
      this.flicks[swapIndex] = swapElem
      this.renderList()
    }
  },

  promoteItem(ev){
    let button = ev.target
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
