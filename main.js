// const link = document.querySelector("#input-link");

// function errorfunc(){
//   const message = document.getElementById("error");
//   message.innerHTML = "";
//   let x = document.getElementById("input-link").value;
//   const re = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
//   try{
//     if(x == ""){
//       throw "Please add a link";
//     }
      
//     if(!re.test(x)){
//       throw "Please insert a valid link";
//     }
      
      
//   }
//   catch(err){
//     message.innerHTML = err;
//   }

// }


for(let item in localStorage) {
  if (!localStorage.hasOwnProperty(item)) {
      continue;
  }
  let wrapper_section = document.querySelector(".input-link")
  let card = document.createElement("section")
  card.className = "shortened_links"
  let links_card = document.createElement("div")
  links_card.className = "links_card"
  let original_link = document.createElement("p")
  original_link.textContent = item
  original_link.className = "original_link"
  let new_link = document.createElement("p")
  new_link.textContent = localStorage[item]
  new_link.className = "new_link"
  let copy_button = document.createElement("button")
  copy_button.textContent = "Copy"
  copy_button.className = "copy_button"
  links_card.append(original_link)
  links_card.append(new_link)
  links_card.append(copy_button)
  card.append(links_card)
  card.classList.add("animate_on_scroll")
  wrapper_section.append(card)
  copy_button.addEventListener("click", (e)=>{
      let links_parent = copy_button.previousElementSibling
      let link_to_be_copied = links_parent.textContent
      navigator.clipboard.writeText(link_to_be_copied)
      copy_button.style.backgroundColor = "hsl(257, 27%, 26%)"
      copy_button.textContent = "Copied!"
      setTimeout(()=>{
          copy_button.textContent = "Copy"
          copy_button.style.backgroundColor = "hsl(180, 66%, 49%)"
      }, 3000)
  })
}



let form = document.querySelector("#form")

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  let input = document.querySelector("#link")
  let link_to_be_shortened = input.value
  let request_link = `https://api.shrtco.de/v2/shorten?url=${link_to_be_shortened}`
  fetch(request_link).then(response => response.json()).then((data) => {
      // Here Is Where All actions after form submission are supposed to be performed
      let wrapper_section = document.querySelector(".input-link")
      let card = document.createElement("section")
      card.className = "shortened_links"
      let links_card = document.createElement("div")
      links_card.className = "links_card"
      
      //Create Card Content
      let original_link = document.createElement("p")
      original_link.textContent = data.result.original_link
      original_link.className = "original_link"

      
      let new_link = document.createElement("p")
      new_link.textContent = data.result.full_short_link
      new_link.className = "new_link"

      //Store The Pair Of Links In Local Storage
      localStorage.setItem(original_link.textContent, new_link.textContent)
      
      let copy_button = document.createElement("button")
      copy_button.textContent = "Copy"
      copy_button.className = "copy_button"

      copy_button.addEventListener("click", (e)=>{
          let links_parent = copy_button.previousElementSibling
          let link_to_be_copied = links_parent.textContent
          navigator.clipboard.writeText(link_to_be_copied)
          copy_button.style.backgroundColor = "hsl(257, 27%, 26%)"
          copy_button.textContent = "Copied!"
          setTimeout(()=>{
              copy_button.textContent = "Copy"
              copy_button.style.backgroundColor = "hsl(180, 66%, 49%)"
          }, 3000)
      })

      //Append Card Content to card
      links_card.append(original_link)
      links_card.append(new_link)
      links_card.append(copy_button)

      //Append Card To Sub-Wrapper Section
      card.append(links_card)
      card.classList.add("animate_on_scroll")

      //Append Card To Wrapper Section
      wrapper_section.append(card)

      console.log(data)
  });
})

function animate_on_scroll() {
  let elements_to_animate = document.querySelectorAll(".animate_on_scroll")
  for(let i=0; i<elements_to_animate.length; i++) {
      let viewport_height = window.innerHeight
      let distance_from_top_of_viewport = elements_to_animate[i].getBoundingClientRect().top
      let distance = 50
      if (distance_from_top_of_viewport < viewport_height-distance) {
          elements_to_animate[i].classList.add("active")
      } else {
          elements_to_animate[i].classList.remove("active")
      }
  }
}

window.addEventListener("scroll", animate_on_scroll)
animate_on_scroll()