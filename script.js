// LOAD DATA
window.addEventListener("load", function () {
  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error("gagal memuat data");

      return res.json();
    })
    .then((data) => {
      console.log(data.about_me);
      renderPortofolio(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

let listCertif;
let listPort;

function renderPortofolio(data) {
  const { home, about_me, portfolio, certificates } = data;
  // ABOUT ME
  document.querySelector(".profile h1").innerText = home.name;
  document.querySelector(".profile-bio").innerText = home.title;
  document.querySelector(".profile-img img").src = home.profile_picture;
  document.querySelector("#about .decs p").innerText = about_me.description;

  listCertif = certificates;
  listPort = portfolio;

  // CERTIFICATES
  document.querySelector(".certificate .decs .list").innerHTML = certificates
    .map((certificate) => templateList(certificate, "certificate-item"))
    .join("");

  // RECENT WORK
  document.querySelector(".portfolio .decs .list").innerHTML = portfolio
    .map((port) => {
      const temp = templateList(port, "project-item");
      const parser = new DOMParser();
      const doc = parser.parseFromString(temp, "text/html");
      const button = document.createElement("button");

      button.classList.add("project-btn", "btn");
      button.innerText = "Detail";
      const projectItem = doc.querySelector(".project-item");
      if (projectItem) {
        projectItem.appendChild(button);
      }

      // Konversi kembali dokumen ke string HTML
      const updatedTemp = doc.body.innerHTML;
      console.log(temp);
      return updatedTemp;
    })
    .join("");
}

function templateList(data, className = "") {
  return `
  <div class="list-item ${className}" data-target="${data.id}">
                <div class="list-thumb ">
                  <img src="${data.images[0]}" alt="" />
                </div>
                <div class="list-thumb-content">
                  <p>Detail</p>
                </div>
                <h3 class="list-title">${data.title}</h3>
                <div class="list-detail">
                  <p class="project-desc"></p>
                  <div class="project-info"></div>
                </div>
              </div>
  `;
}

// ABOUT TABS
document.querySelectorAll(".tab-item").forEach((button) => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");

    document.querySelectorAll(".tab-item").forEach((tab) => {
      tab.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.classList.remove("active");
    });

    this.classList.add("active");

    document.querySelector(targetId).classList.add("active");
  });
});

// POP UP
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    togglePopup();
    document.querySelector(".popup").scrollTo(0, 0);
    popupItemDetails(e.target.parentElement);
  }
});

document.querySelector(".popup-close").addEventListener("click", togglePopup);

function togglePopup() {
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".popup").classList.toggle("open");
  document.querySelector(".app").classList.toggle("fade-out");
}

function popupItemDetails(projectItem) {
  const target = projectItem.getAttribute("data-target");
  const targetPort = listPort.find((port) => port.id == target);

  console.log(targetPort);
  const images = targetPort.images
    .map(
      (img) => `
   <div class="slider-item">
                <img src="${img}" alt="" />
              </div>
  `
    )
    .join("");

  const dots = Array.from(Array(targetPort.images.length).keys()).map(
    (index) => {
      return `
          <li class="${index == 0 ? "active" : ""}"></li>
          `;
    }
  );

  document.querySelector(".dots").innerHTML = dots.join("");
  document.querySelector(".slider-list").innerHTML = images;

  document.querySelector(".slider-item").classList.add("active");
  document.querySelector(".popup-content h3").innerHTML =
    projectItem.querySelector(".list-title").innerHTML;

  document.querySelector(".popup-body").innerHTML =
    projectItem.querySelector(".list-detail").innerHTML;
}

// NAVBAR

const navItems = document.querySelectorAll(".nav-item");
const heading = document.querySelectorAll(".heading");
const section = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let index = section.length;

  while (--index && window.scrollY + 50 < section[index].offsetTop) {}

  navItems.forEach((item) => item.classList.remove("active"));

  navItems[index].classList.add("active");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  });
});

// CERTIFICATES POPUP

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("list-thumb-content")) {
    console.log("test");
    togglePopup();
    document.querySelector(".popup").scrollTo(0, 0);
    popupCertificate(e.target.parentElement);
  }
});

function popupCertificate(projectItem) {
  console.log(listCertif);
  console.log(projectItem);

  const target = projectItem.getAttribute("data-target");
  console.log(target);
  const targetCertif = listCertif.find((certif) => certif.id == target);

  const images = targetCertif.images
    .map((img) => {
      return `
     <div class="slider-item">
                <img src="${img}" alt="" />
              </div>
    `;
    })
    .join("");

  const dots = Array.from(Array(targetCertif.images.length).keys()).map(
    (index) => {
      return `
        <li class="${index == 0 ? "active" : ""}"></li>
        `;
    }
  );

  document.querySelector(".dots").innerHTML = dots.join("");

  document.querySelector(".slider-list").innerHTML = images;

  // get first element and add active class

  // document.querySelector(".slider-list").innerHTML = images;
  document.querySelector(".slider-item").classList.add("active");

  document.querySelector(".popup-content h3").innerText =
    projectItem.querySelector(".list-title").innerText;

  document.querySelector(".popup-body").innerHTML =
    projectItem.querySelector(".list-detail").innerHTML;
}

// SLIDER
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("list-thumb-content") ||
    e.target.classList.contains("project-btn")
  ) {
    const list = document.querySelector(".slider .slider-list");
    const items = document.querySelectorAll(".slider-item");
    const dots = document.querySelectorAll(".popup-content .dots li");
    const prev = document.querySelector(".slider .prev");
    const next = document.querySelector(".slider .next");

    let active = 0;
    let lengthItems = items.length - 1;
    console.log(lengthItems);

    next.onclick = function () {
      if (active + 1 > lengthItems) {
        active = 0;
      } else {
        active++;
      }
      reloadSlider();
    };

    prev.onclick = function () {
      if (active - 1 < 0) {
        active = lengthItems;
      } else {
        active--;
      }
      reloadSlider();
    };

    function reloadSlider() {
      items.forEach((item) => {
        item.classList.remove("active");
      });
      items[active].classList.add("active");

      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
      dots[active].classList.add("active");
    }
  }
});
