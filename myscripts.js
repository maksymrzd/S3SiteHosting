function createBorders(){
    let elements = document.getElementsByClassName("tile")
    for (let el of elements){
      let classes = el.classList
      let tileNum = classes[1]
      for (let i = 0; i<3; i++){
        for (let j = 0; j<3; j++){
          let k = document.getElementById(i.toString() + j.toString())
          if (i == 0){
            k.classList.add("bottomborder")
          }
          else if (i == 2) {
            k.classList.add("topborder")
          }
          if (j == 0){
            k.classList.add("rightborder")
          }
          else if (j == 2) {
            k.classList.add("leftborder")
          }
        }
      }
    }
  }
  var isContinuing = true
  function checkWinner() {
    //vertically
    for (let i = 0; i<3; i++){
        let el1 = document.getElementById("0"+i.toString())
        let el2 = document.getElementById("1"+i.toString())
        let el3 = document.getElementById("2"+i.toString())
        if (el1.innerHTML == el2.innerHTML && el2.innerHTML == el3.innerHTML && el3.innerHTML != "") {
          el1.classList.add("winner")
          el2.classList.add("winner")
          el3.classList.add("winner")
          isContinuing = false
          return 0
        }
    }
    
    //horizontally
    for (let i = 0; i<3; i++){
        let el1 = document.getElementById(i.toString()+"0")
        let el2 = document.getElementById(i.toString()+"1")
        let el3 = document.getElementById(i.toString()+"2")
        if (el1.innerHTML == el2.innerHTML && el2.innerHTML == el3.innerHTML && el3.innerHTML != "") {
          el1.classList.add("winner")
          el2.classList.add("winner")
          el3.classList.add("winner")
          isContinuing = false
          return 0
        }
    }
    
    //diagonally
    let el1 = document.getElementById("00")
    let el2 = document.getElementById("11")
    let el3 = document.getElementById("22")
    if (el1.innerHTML == el2.innerHTML && el2.innerHTML == el3.innerHTML && el3.innerHTML != "") {
      el1.classList.add("winner")
      el2.classList.add("winner")
      el3.classList.add("winner")
      isContinuing = false
      return 0
    }
    
    el1 = document.getElementById("20")
    el2 = document.getElementById("11")
    el3 = document.getElementById("02")
    if (el1.innerHTML == el2.innerHTML && el2.innerHTML == el3.innerHTML && el3.innerHTML != "") {
      el1.classList.add("winner")
      el2.classList.add("winner")
      el3.classList.add("winner")
      isContinuing = false
      return 0
    }
  }
  
  var step = "X"
  function makeStep(id){
    if(isContinuing){
      let el = document.getElementById(id)
      if (el.innerHTML == ""){
        el.innerHTML = step
        if (step == "X"){
          step = "O"
        }
        else {
          step = "X"
        }
      }
      checkWinner()
    }
  }
  
  function restartGame(){
    for (let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        let el = document.getElementById(i.toString()+j.toString())
        el.innerHTML = ""
        el.classList.remove("winner")
        isContinuing = true
      }
    }
  }
