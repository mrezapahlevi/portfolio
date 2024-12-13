// LOAD DATA
window.addEventListener("DOMContentLoaded", function () {
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

function renderPortofolio(data) {
  const { home, about_me, portfolio, certificates } = data;
  // ABOUT ME
  document.querySelector(".profile h1").innerText = home.name;
  document.querySelector(".profile-bio").innerText = home.title;
  document.querySelector(".profile-img img").src = home.profile_picture;
  document.querySelector("#about .decs p").innerText = about_me.description;

  // CERTIFICATES
  document.querySelector(".certificate .decs .list").innerHTML = certificates
    .map((certificate) => {
      return `
      <div class="list-item certificate-item">
                <div class="list-thumb ">
                  <img src="${certificate.images[0]}" alt="" />
                </div>
                <div class="list-thumb-content">
                  <p>Detail</p>
                </div>
                <h3 class="list-title">${certificate.title}</h3>
                <div class="list-detail">
                  <p class="project-desc">hai</p>
                  <div class="project-info"></div>
                </div>
              </div>
      `;
    })
    .join("");
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
  document.querySelector(".popup-thumbnail img").src =
    projectItem.querySelector(".list-thumb img").src;

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
  console.log(projectItem);
  document.querySelector(".popup-thumbnail img").src =
    projectItem.querySelector(".list-thumb img").src;

  document.querySelector(".popup-content h3").innerText =
    projectItem.querySelector(".list-title").innerText;

  document.querySelector(".popup-body").innerHTML =
    projectItem.querySelector(".list-detail").innerHTML;
}

// SLIDER
