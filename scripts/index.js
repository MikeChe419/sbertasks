const api = new Api("lyakh");
let catsData = localStorage.getItem("cats");
let URLArr = [] 

const updCards = function(data, container) {
  data.forEach((cat) => {
    const card = document.createElement('a');
    const btn = document.createElement('button');
    btn.setAttribute('type', 'submit')
    const fa = document.createElement('i');
    let img = {}
    URLArr = JSON.parse(localStorage.getItem("catsimg"));
    if (URLArr.find(img => img.id == cat.id) !== null ) {
      img = URLArr.find(img => img.id == cat.id)
    }
    card.setAttribute('href', `/cat.html?=${cat.id}`)
    card.setAttribute('target', 'blank');
    card.setAttribute('style', `background-image: url(${img.url || "images/cat.jpg"});`);
    fa.classList.add('fa-solid', 'fa-xmark');
    btn.classList.add('remove-btn');
    if (cat.favourite) {
      card.classList.add("card" , "like");
    } else card.classList.add('card')
    
    
    let nameSpan = document.createElement('span');
    nameSpan.textContent = cat.name;
    card.append(nameSpan)
    container.append(card)
    btn.append(fa)
    card.append(btn)
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let find = catsData.findIndex(item => item.id == cat.id);
      catsData.splice(find, 1)
      localStorage.setItem("cats", JSON.stringify(catsData))
      api.delCat(cat.id);
      card.remove();
    });
    return {
      card,
      URLArr
    } 
  });
  // document.querySelectorAll('.card').forEach(el => {
  //   el.addEventListener('click', () => {
  //     const catName = el.querySelector('span').textContent;
  //     let find = catsData.find(item => item.name == catName);
  //   })
  // })
}


function createBodyRequest(form, body) {
  for (let i = 0; i < form.elements.length; i++) {
    let inp = form.elements[i];
    if (inp.type === "checkbox") {
      body[inp.name] = inp.checked;
    } else if (inp.name && inp.value) {
      if (inp.type === "number") {
        body[inp.name] = +inp.value;
      } else {
        body[inp.name] = inp.value;
      }
    }
  }
}

if (window.location.pathname == '/index.html') {
  let main = document.querySelector("main");
  let addBtn = document.querySelector("#add");
  let popupForm = document.querySelector("#popup-form");
  let closePopupForm = document.querySelector(".popup-close");
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();

  if (!popupForm.classList.contains("active")) {
    popupForm.classList.add("active");
    popupForm.parentElement.classList.add("active");
  }
});
closePopupForm.addEventListener("click", () => {
  popupForm.classList.remove("active");
  popupForm.parentElement.classList.remove("active");
});

catsData = catsData ? JSON.parse(catsData) : [];
const getCats = function (api, store) {
    api
      .getCats()
      .then((res) => res.json())
      .then((data) => {
        updCards(data, main)
        localStorage.setItem("cats", JSON.stringify(data));
        catsData = [...data];
      });
};
getCats(api, catsData);

let form = document.forms[0];
form.img_link.addEventListener("change", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
form.img_link.addEventListener("input", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let body = {};
  createBodyRequest(form, body)
  let arrURL = JSON.parse(localStorage.getItem("catsimg"))
  let  URL = {
    id: body.id,
    url: body.img_link
  }
  arrURL.push(URL)
  localStorage.setItem('catsimg', JSON.stringify(arrURL))
  api
    .addCat(body)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.message === "Кот успешно добавлен в Базу данных") {
        catsData.push(body);
        console.log(catsData)
        document.querySelectorAll('.card').forEach(el => el.remove());
        localStorage.setItem("cats", JSON.stringify(catsData));
        updCards(catsData, main)
        form.reset();
        closePopupForm.click();
      } else {
        console.log(data);
        api
          .getIds()
          .then((r) => r.json())
          .then((d) => {
            main.childNodes.forEach(el => el.remove());
            updCards(d, main)
          });
      }
    });

    popupForm.classList.remove("active");
    popupForm.parentElement.classList.remove("active");
  });
} else {
  function UpdateCats() {
    let ID = (window.location.search).slice(2);
    URLArr = JSON.parse(localStorage.getItem("catsimg"));
    let find = URLArr.find(item => item.id == ID)
    const inptutID = document.querySelector('#id');
    const inputAge = document.querySelector('#age');
    const inputCatName = document.querySelector('#name');
    const inputRate = document.querySelector('#rate');
    const inputDescr = document.querySelector('#descr')
    const img = document.querySelector('.form-img')
    const imgLink = document.querySelector('#img-link')
    inptutID.readOnly = true;
    img.setAttribute('style', `background-image: url(${find.url})`)
    api.getCat(ID)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        inptutID.value = data.id;
        inputAge.value = data.age;
        inputCatName.value = data.name;
        inputRate.value = data.rate;
        inputDescr.value = data.description
        imgLink.value = find.url
        document.querySelector('button').addEventListener('click', (e)=> {
          e.preventDefault();
          let body = {};
          let form = document.forms[0];
          createBodyRequest(form, body) ;
          URLArr.splice(find, 1);
          find = {
             id: ID,
             url: document.querySelector('#img-link').value
          }
          URLArr.push(find);
          localStorage.setItem('catsimg', JSON.stringify(URLArr))
          api.updCat(ID, body)
          .then(data => console.log(data))
          UpdateCats()
        })
      })
      
  }
  UpdateCats()
}

Cookies.set('foo', 'bar')
const cookieValue = Cookies.get('foo')
console.log(cookieValue)
