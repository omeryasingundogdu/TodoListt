//------------------------------------------------//
//Tanımlamalar
const not = document.getElementById("todo-input");
const deneme = document.getElementById("mission");
const checkBox = document.getElementsByClassName("completed");
const checkAll = document.getElementById("checkAll");
const gizle = document.getElementsByClassName("1");
const taskKey = "Görevler :";
let checkBoxs = document.getElementsByClassName("checkBox");
//------------------------------------------------//
//Ekleme görevi

function ekleGorev(task) {
  if (not.value.trim() !== "") {
    const element = document.createElement("li");
    const checkbox = document.createElement("input");
    const textElement = document.createElement("p1");
    checkbox.type = "checkbox";
    checkbox.className = "checkBox";
    element.appendChild(checkbox);
    //bunu kullanmak mantıksız çünki checkbox a çift tıklanıldığında silinmesine neden olur.
    //element.appendChild(document.createTextNode(not.value));
    textElement.innerText = not.value;
    element.appendChild(textElement);
    deneme.appendChild(element);

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        element.classList.add("completed");
      } else {
        element.classList.remove("completed");
      }
    });
    textElement.addEventListener("dblclick", function () {
      if (element.innerText) {
        localStorage.removeItem("Görevler: ");
      }
    });
    localSet(not.value);
    not.value = "";
  }
}
//silme görevi
function silGorev() {
  if (
    confirm("bütün görevler ve ayarlar silinicektir. Onaylıyor musun?") == true
  ) {
    clearLocalStorage();
    deneme.innerHTML = "";
  }
}
//Tuş ataması ekleme (Enter)
not.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    ekleGorev();
  }
});
//Tuş ataması silme (Arrrow UP)
not.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    silGorev();
  }
});
//bütün checkboxları checked olarak işaretler
function checkAllFunction() {
  for (let i = 0; i < checkBoxs.length; i++) {
    checkBoxs[i].checked = true;
    checkBoxs[i].parentElement.classList.add("completed");
  }
}
//bütün checkboxları unchecked olarak işaretler
function UnCheckAllFunction() {
  for (let i = 0; i < checkBoxs.length; i++) {
    checkBoxs[i].checked = false;
    checkBoxs[i].parentElement.classList.remove("completed");
  }
}
//checked olan checkboxları siler
function secili() {
  let check = document.getElementsByClassName("checkBox");
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked == true) {
      check[i].parentElement.remove();
      i--;
      removeTask();
    }
  }
}
function removeTask(index) {
  tasks.splice(index, 1);
}

//localStorage oluşturma
function localSet(task) {
  let tasks = localGet();
  tasks.push(task);
  localStorage.setItem(taskKey, JSON.stringify(tasks));
}
//localStorage çağırma
function localGet() {
  return JSON.parse(localStorage.getItem(taskKey)) || [];
}
//localStorage silme
function clearLocalStorage() {
  localStorage.clear();
}
//sayfa yüklendiğinde çalışacak
window.onload = function () {
  const checkboxx = document.getElementById("gostermeBidaha");
  if (localStorage.getItem("gostermeBidaha") === "true") {
    checkboxx.checked = true;
  }
};

if (localStorage.getItem("gostermeBidaha") == "true") {
  document.getElementById("infoBox").style.display = "none";
} else if (localStorage.getItem("gostermeBidaha") == null || "false") {
  document.getElementById("infoBox").style.display = "block";
}

const tasks = localGet();
tasks.forEach((task) => {
  const element = document.createElement("li");

  const checkbox = document.createElement("input");
  const textElement = document.createElement("p1");
  checkbox.type = "checkbox";

  checkbox.className = "checkBox";
  console.log(checkBox.checked);
  element.appendChild(checkbox);
  textElement.innerText = task;
  element.appendChild(textElement);
  deneme.appendChild(element);

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      element.classList.add("completed");
    } else {
      element.classList.remove("completed");
    }
  });

  textElement.addEventListener("dblclick", function () {
    if (element.innerText) {
      element.remove();
    }
  });
});

function onayy() {
  const infoBox = document.getElementById("infoBox");

  if (gostermeBidaha.checked) {
    localStorage.setItem("gostermeBidaha", "true");
  } else {
    localStorage.setItem("gostermeBidaha", "false");
  }

  infoBox.style.display = "none";
}

function kapat() {
  const infoBox = document.getElementById("infoBox");
  infoBox.style.display = "none";
}

function gosterme() {
  document.getElementById("infoBox").style.display = "block";
}
