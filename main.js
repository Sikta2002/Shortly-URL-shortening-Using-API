const link = document.querySelector("#form");

function errorfunc(){
  const message = document.getElementById("error");
  message.innerHTML = "";
  let x = document.getElementById("link").value;
  const re = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  try{
    if(x == ""){
      
      throw "Please add a link";
    }
      
    if(!re.test(x)){
      throw "Please insert a valid link";
    }
  }
  catch(err){
    message.innerHTML = err;
  }

}


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

      
      let wrapper_section = document.querySelector(".input-link")
      let card = document.createElement("section")
      card.className = "shortened_links"
      let links_card = document.createElement("div")
      links_card.className = "links_card"
      
      
      let original_link = document.createElement("p")
      original_link.textContent = data.result.original_link
      original_link.className = "original_link"

      
      let new_link = document.createElement("p")
      new_link.textContent = data.result.full_short_link
      new_link.className = "new_link"

      
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

      
      links_card.append(original_link)
      links_card.append(new_link)
      links_card.append(copy_button)

      
      card.append(links_card)
      

      
      wrapper_section.append(card)

      console.log(data)
  });
})
