const fetchData = async function (url) {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("Something went wrong while fetching the data!");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`An error occured while fetching data: ${error}`);
  }
};

// to kind of reset everything
// localStorage.clear();

// json-file locations
const departmentUrl = "/json-files/department.json";
const animalsUrl = "/json-files/animals.json";
const leopardUrl = "/json-files/leopard.json";
const yalaDataUrl = "/json-files/yala.json";
const wilpattuDataUrl = "/json-files/wilpattu.json";
const adminDataUrl = "/json-files/user_credentials.json";

// checking whether if data exists if exists im not setting them again and again
const hasDataStored = localStorage.getItem("dataStored");
if (!hasDataStored) {
  const storeData = async function () {
    const departmentData = await fetchData(departmentUrl);
    const leopardData = await fetchData(leopardUrl);
    const animalData = await fetchData(animalsUrl);
    const yalaData = await fetchData(yalaDataUrl);
    const wilpattuData = await fetchData(wilpattuDataUrl);

    localStorage.setItem("departmentData", JSON.stringify(departmentData));
    localStorage.setItem("leopardData", JSON.stringify(leopardData));
    localStorage.setItem("animalData", JSON.stringify(animalData));
    localStorage.setItem("yalaData", JSON.stringify(yalaData));
    localStorage.setItem("wilpattuData", JSON.stringify(wilpattuData));

    localStorage.setItem("dataStored", "true");
  };

  storeData();
}

// Fetching and rendering Department data
const fetchDepartmentData = async () => {
  let departmentData;
  if (localStorage.getItem("departmentData")) {
    departmentData = await JSON.parse(localStorage.getItem("departmentData"));
  } else {
    departmentData = await fetchData(departmentUrl);
  }
  renderDepartmentData(departmentData);
};

fetchDepartmentData();

const renderDepartmentData = function (data) {
  data.forEach((el) => {
    if (el.introduction) {
      const introData = el.introduction.content;
      const introDiv = document.querySelector(".department-introduction");

      let introCard = "";
      for (let i = 0; i < introData.length; i++) {
        introCard += `
                          <h1 class="intro-dep-header">${introData[i].title}</h1>
                          <p class="intro-dep-para">${introData[i].description}</p>
                          `;
      }
      introDiv.insertAdjacentHTML("afterbegin", introCard);
    }

    if (el.section) {
      const sectionData = el.section;

      const sectionIntroDiv = document.querySelector(".department-section1");
      const contentDiv = document.querySelector(".department-img-section");
      const mapDiv = document.querySelector(".department-section-map");

      const sectionIntroCard = `
                              <h2 class="dep-section-gallery-header">${sectionData.title}</h2>
                              <p class="dep-section-gallery-para">${sectionData.description}</p>
                              `;

      sectionIntroDiv.insertAdjacentHTML("afterbegin", sectionIntroCard);

      let sectionContent = sectionData.content;

      let contentCard = "";
      for (let i = 0; i < sectionContent.length; i++) {
        contentCard += `
                        <div class="dep-image">
                          <img
                            class="dep-img"
                            alt="gallery image ${i + 1}"
                            src="${sectionContent[i].image}"
                          />
                          <div class="dep-img-name">
                            <p>${sectionContent[i].heading}</p>
                          </div>
                        </div>
                        `;
      }

      contentDiv.insertAdjacentHTML("afterbegin", contentCard);

      let mapLink = sectionData.mapLink;
      console.log(mapLink);
      const mapCard = `
                      <div class="map-dep">
                        <iframe
                          src="${mapLink}"
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                        `;

      mapDiv.insertAdjacentHTML("afterbegin", mapCard);
    }
  });
};

//  Fetching and rendering Animals data
const fetchAnimalData = async () => {
  let animalData;
  if (localStorage.getItem("animalData")) {
    animalData = await JSON.parse(localStorage.getItem("animalData"));
  } else {
    animalData = await fetchData(animalsUrl);
  }
  renderAnimalData(animalData);
};

fetchAnimalData();

const renderAnimalData = function (data) {
  data.forEach((el) => {
    // console.log(el);
    if (el.introduction) {
      let animalsIntroDiv = document.querySelector(".animals-intro");
      const introData = el.introduction;
      const introCard = `
                        <h1 class="intro-header">${introData.title}</h1>
                        <p class="intro-para">${introData.description}</p>
                        `;

      animalsIntroDiv.insertAdjacentHTML("afterbegin", introCard);
    }

    if (el.sections) {
      const sectionData = el.sections;
      for (let i = 0; i < sectionData.length; i++) {
        // console.log(sectionData[i]);

        const section1Div = document.querySelector(".animals-section1");
        const section2Div = document.querySelector(".animals-section2");
        const section3Div = document.querySelector(".animals-section3");

        const image1Div = document.querySelector(".animals-image-section1");
        const image2Div = document.querySelector(".animals-image-section2");
        const image3Div = document.querySelector(".animals-image-section3");

        const content1Div = document.querySelector(".animals-content-section1");
        const content2Div = document.querySelector(".animals-content-section2");
        const content3Div = document.querySelector(".animals-content-section3");

        const cardData = sectionData[i];
        // console.log(cardData.title);
        const sectionTitleCard = `
                                    <p class="animals-1-heading">${cardData.title}</p>
                                    `;

        // initially eqalizing it to an empty string because, otherwise it would just pass in an undefined
        let section1ContentCard = "";
        for (let j = 0; j < cardData.content.length; j++) {
          const contentData = cardData.content[j];
          // console.log(contentData.title, contentData.description);
          section1ContentCard += `
                                      <p class="animals-sub-heading">${contentData.title}</p>
                                      <p>${contentData.description}</p>
                                    `;
        }

        const sectionImageCard = `
                                    <div class="animals-1-img animals-image-section1">
                                      <div class="animals-1-image">
                                        <img alt="section ${
                                          i + 1
                                        } image" src="${cardData.image}" />
                                        <div class="animals-1-button">
                                          <a
                                            href="${cardData.btnLink}"
                                            target="_blank"
                                            >Learn More</a
                                          >
                                        </div>
                                      </div>
                                    </div>`;

        if (sectionData[i].id == 1) {
          section1Div.insertAdjacentHTML("afterbegin", sectionTitleCard);
          content1Div.insertAdjacentHTML("afterbegin", section1ContentCard);
          image1Div.insertAdjacentHTML("afterbegin", sectionImageCard);
        } else if (sectionData[i].id == 2) {
          section2Div.insertAdjacentHTML("afterbegin", sectionTitleCard);
          content2Div.insertAdjacentHTML("afterbegin", section1ContentCard);
          image2Div.insertAdjacentHTML("afterbegin", sectionImageCard);
        } else if (sectionData[i].id == 3) {
          section3Div.insertAdjacentHTML("afterbegin", sectionTitleCard);
          content3Div.insertAdjacentHTML("afterbegin", section1ContentCard);
          image3Div.insertAdjacentHTML("afterbegin", sectionImageCard);
        }
      }
    }
  });
};

// Fetching and rendering Sl Leopard data
const fetchLeopardData = async () => {
  let leopardData;
  if (localStorage.getItem("animalData")) {
    leopardData = await JSON.parse(localStorage.getItem("leopardData"));
  } else {
    leopardData = await fetchData(leopardUrl);
  }
  renderLeopardData(leopardData);
};

fetchLeopardData();

const renderLeopardData = function (data) {
  const pageData = data[0].sections;
  pageData.forEach((el) => {
    if (el.id == 1) {
      const section1Data = el.content;
      for (let i = 0; i < section1Data.length; i++) {
        if (section1Data[i].id % 2 != 0) {
          let section1 = document.querySelector(".yala-section1");
          let section3 = document.querySelector(".yala-section3");
          const sectionCard = `
                              <div class="section-1-content">
                                <div class="section-1-f">
                                  <h2>${section1Data[i].title}</h2>
                                  <p class="national-parks-para">${section1Data[i].description}</p>
                              </div>
                                </div>
                                <div class="section-1-img yala-section1-img">
                                  <div class="section-1-image leopard-img">
                                    <img
                                      alt="section 1 image"
                                      src="${section1Data[i].image}"
                                    />
                                  <div class="section-1-button">
                                    <a
                                      href="${section1Data[i].btnLink}"
                                      target="_blank"
                                      >Learn More</a
                                    >
                                  </div>
                                </div>
                              </div>
                                `;
          if (section1Data[i].id == 1) {
            section1.insertAdjacentHTML("afterbegin", sectionCard);
          } else if (section1Data[i].id == 3) {
            section3.insertAdjacentHTML("afterbegin", sectionCard);
          }
        } else {
          let section2 = document.querySelector(".yala-section2");

          const sectionCard = `
                            <div class="section-2-img">
                              <div class="section-2-image leopard-img">
                                <img
                                  alt="section 2 image"
                                  src="${section1Data[i].image}"
                                />
                                <div class="section-2-button">
                                  <a
                                    href="${section1Data[i].btnLink}"
                                    target="_blank"
                                    >Learn More</a
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="section-2-content">
                              <div class="section-2-f">
                                <h2 class="section-2-fh">${section1Data[i].title}</h2>
                                <p class="national-parks-para">${section1Data[i].description}</p>
                              </div>
                            </div>
                                `;

          section2.insertAdjacentHTML("afterbegin", sectionCard);
        }
      }
    }
    if (el.id == 2) {
      let headerEl = document.querySelector(".threats-heading");
      const header = `
                      <p class="header-leopard">${el.title}</p>
                        `;
      headerEl.insertAdjacentHTML("afterbegin", header);

      let data = el.content;

      for (let i = 0; i < data.length; i++) {
        // in order to do it dynamically we need to iterate through this result array (using a method like map, however its not really the easiest way of doing this, since we know that there're only 3 subheading im doing it manually :/)
        // function addSubHeadings() {
        //   let result = [];
        //   for (let j = 0; j < data[i].content.length; j++) {
        //     const subSectionCard = `<p class="threat-heading">${data[i].content[j].title}</p>
        //                             <p>${data[i].content[j].description}</p>`;
        //     result.push(subSectionCard);
        //   }
        //   console.log(result);
        //   return result;
        // }

        // addSubHeadings();
        const sectionCard1 = document.querySelector(".leopard-section1");
        const sectionCardFooter1 = document.querySelector(
          ".threats-learn-more1"
        );
        const sectionCard2 = document.querySelector(".leopard-section2");
        const sectionCardFooter2 = document.querySelector(
          ".threats-learn-more2"
        );

        const cardImage = `<div class="section-1-img">
                              <div class="section-1-image">
                                <img alt="threats image 1" src="${data[i].image}" />
                              </div>
                            </div>`;

        const cardContent = `<div class="section-1-content">
                                <div class="section-1-f">
                                  <p class="threat-main">${data[i].title}</p>
                                  <p class="threat-heading">${data[i].content[0].title}</p>
                                  <p>${data[i].content[0].description}</p>
                                  <p class="threat-heading">${data[i].content[1].title}</p>
                                  <p>${data[i].content[1].description}</p>
                                  <p class="threat-heading">${data[i].content[2].title}</p>
                                  <p>${data[i].content[2].description}</p>
                                </div>
                              </div>`;

        const cardFooter = `
                              <p> ${
                                data[i].id == 1
                                  ? `Learn more and join the cause at: `
                                  : `Discover more about habitat conservation at: `
                              }
                                <a href="${data[i].infoLink}"
                                  >${
                                    data[i].id == 1
                                      ? "Wildlife Conservation Society - Sri Lanka"
                                      : "Horton Plains Conservation Society"
                                  }</a
                                >
                              </p>`;

        if (data[i].id == 1) {
          sectionCard1.insertAdjacentHTML("afterbegin", cardImage);
          sectionCard1.insertAdjacentHTML("beforeend", cardContent);
          sectionCardFooter1.insertAdjacentHTML("beforeend", cardFooter);
        }

        if (data[i].id == 2) {
          sectionCard2.insertAdjacentHTML("afterbegin", cardImage);
          sectionCard2.insertAdjacentHTML("afterbegin", cardContent);
          sectionCardFooter2.insertAdjacentHTML("beforeend", cardFooter);
        }
      }
    }
  });
};

// Fetching and rendering Yala data
const fetchYalaData = async () => {
  let yalaData;
  if (localStorage.getItem("animalData")) {
    yalaData = await JSON.parse(localStorage.getItem("yalaData"));
  } else {
    yalaData = await fetchData(yalaDataUrl);
  }
  renderYalaData(yalaData);
};

fetchYalaData();

const renderYalaData = function (data) {
  data.forEach((el) => {
    if (el.introduction) {
      let yalaIntroDiv = document.querySelector(".yala-introduction");
      const introData = el.introduction;

      const introCard = `
                          <h3>${introData.title}</h3>
                          <p>${introData.description}</p>
                          `;

      yalaIntroDiv.insertAdjacentHTML("afterbegin", introCard);
    }

    if (el.wildlife) {
      let headerEl = document.querySelector(".wildlife-yala-section1");
      let title = el.wildlife.sections[0].title;

      const header = `
                    <h3>${title}</h3>
                    `;

      headerEl.insertAdjacentHTML("afterbegin", header);

      let wildlifeDiv = document.querySelector(".wildlife-yala");
      const contentData = el.wildlife.sections[0].content;
      for (let i = 0; i < contentData.length; i++) {
        const card = `
                      <div class="wild-life-content">
                        <h4>${contentData[i].title}</h4>
                        <div class="wild-life-images">
                          <img
                            alt="section image 1.${i}"
                            src="${contentData[i].image}"
                          />
                        </div>
                        <p>${contentData[i].description}</p>
                      </div>
                      `;

        wildlifeDiv.insertAdjacentHTML("afterbegin", card);
      }
    }

    if (el.conservation_efforts) {
      let headerEl = document.querySelector(".wildlife-yala-section2");
      const title = el.conservation_efforts.sections[0].title;

      const header = `
                    <h3>${title}</h3>
                    `;

      headerEl.insertAdjacentHTML("afterbegin", header);

      let conservation_effortsDiv = document.querySelector(
        ".conservation_efforts"
      );

      const contentData = el.conservation_efforts.sections[0].content;
      for (let i = 0; i < contentData.length; i++) {
        const card = `
                    <div class="wild-life-content">
                      <h4>${contentData[i].title}</h4>
                      <div class="wild-life-images">
                        <img
                          alt="section image 2.${i}"
                          src="${contentData[i].image}"
                        />
                      </div>
                      <p>${contentData[i].description}</p>
                    </div>
                      `;

        conservation_effortsDiv.insertAdjacentHTML("afterbegin", card);
      }
    }
  });
};

// Fetching and rendering Wilpattu data
const fetchWilpattuData = async () => {
  let wilpattuData;
  if (localStorage.getItem("animalData")) {
    wilpattuData = await JSON.parse(localStorage.getItem("wilpattuData"));
  } else {
    wilpattuData = await fetchData(wilpattuDataUrl);
  }
  renderWilpattuData(wilpattuData);
};

fetchWilpattuData();

const renderWilpattuData = function (data) {
  data.forEach((el) => {
    let introductionDiv = document.querySelector(".wilpattu-introduction");
    if (el.introduction) {
      const introData = el.introduction;
      const card = `
                    <h3>${introData.title}</h3>
                    <p>${introData.description}</p>
                `;
      introductionDiv.insertAdjacentHTML("afterbegin", card);
    }

    if (el.wildlife) {
      let headerEl = document.querySelector(".wildlife-wilpattu-section1");
      let title = el.wildlife.sections[0].title;
      const header = `
                    <h3>${title}</h3>
                `;

      headerEl.insertAdjacentHTML("afterbegin", header);

      let wildLifeDiv = document.querySelector(".wildlife-wilpattu");
      const contentData = el.wildlife.sections[0].content;

      for (let i = 0; i < contentData.length; i++) {
        const card = `
                    <div class="wild-life-content">
                        <div class="wild-life-images">
                        <h4>${contentData[i].heading}</h4>
                        <img
                            alt="section image 1.${i}"
                            src="${contentData[i].image}"
                        />
                        </div>
                        <p>${contentData[i].description}</p>
                    </div>
                    `;
        wildLifeDiv.insertAdjacentHTML("afterbegin", card);
      }
    }

    if (el.historical_cultural) {
      let headerEl = document.querySelector(".wildlife-wilpattu-section2");
      let title = el.historical_cultural.sections[0].title;
      const header = `
                    <h3>${title}</h3>
                `;
      headerEl.insertAdjacentHTML("afterbegin", header);
      let historical_culturalDiv = document.querySelector(
        ".historical_cultural"
      );
      const contentData = el.historical_cultural.sections[0].content;

      for (let i = 0; i < contentData.length; i++) {
        const card = `
                    <div class="wild-life-content">
                        <div class="wild-life-images">
                            <h4>${contentData[i].heading}</h4>
                            <img
                            alt="section image 2.${i}"
                            src="${contentData[i].image}"
                            />
                        </div>
                        <p>${contentData[i].description}</p>
                    </div>
                    `;
        historical_culturalDiv.insertAdjacentHTML("afterbegin", card);
      }
    }
  });
};

// Authenticating the user

const fetchAdminData = async () => {
  const adminData = await fetchData(adminDataUrl);
  return adminData;
};

const form = document.querySelector(".loginForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let form = document.querySelector(".container");

  let navBar = document.querySelector(".nav-bar");
  let currentUser = document.querySelector(".current-user");
  let dashBoard = document.querySelector(".dashboard");

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const adminData = await fetchAdminData();
  console.log(adminData);

  for (let i = 0; i < adminData.users.length; i++) {
    if (
      (username == adminData.users[i].username ||
        username == adminData.users[i].email) &&
      password == adminData.users[i].password
    ) {
      const currentUserDisplay = `<p>${username}</p>`;
      currentUser.insertAdjacentHTML("afterbegin", currentUserDisplay);

      navBar.classList.remove("display-none");
      dashBoard.classList.remove("display-none");
      form.classList.add("display-none");
    }
  }
});

let getDataBtn = document.querySelector(".get-data");
getDataBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var selectedPage = document.querySelector(".page").value;
  let output = document.querySelector(".data-output");
  output.value = "";
  if (selectedPage == "home") {
  }
  if (selectedPage == "department") {
    const departmentData = localStorage.getItem("departmentData");
    output.value = departmentData;
  }
  if (selectedPage == "introduction") {
  }
  if (selectedPage == "animals") {
    const animalData = localStorage.getItem("animalData");
    output.value = animalData;
  }
  if (selectedPage == "leopard") {
    const leopardData = localStorage.getItem("leopardData");
    output.value = leopardData;
  }
  if (selectedPage == "yala") {
    const yalaData = localStorage.getItem("yalaData");
    output.value = yalaData;
  }
  if (selectedPage == "wilpattu") {
    const wilpattuData = localStorage.getItem("wilpattuData");
    output.value = wilpattuData;
  }
});

let updateContentBtn = document.querySelector(".make-changes");
updateContentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var selectedPage = document.querySelector(".page").value;
  var changes = document.querySelector(".data-output").value;

  console.log(selectedPage);
  console.log(changes);

  console.log(selectedPage);
  if (changes != "") {
    if (selectedPage == "home") {
    }
    if (selectedPage == "department") {
      localStorage.setItem("departmentData", changes);
      const departmentData = JSON.parse(changes);
      renderDepartmentData(departmentData);
    }
    if (selectedPage == "introduction") {
    }
    if (selectedPage == "animals") {
      localStorage.setItem("animalData", changes);
      const animalsData = JSON.parse(changes);
      renderAnimalData(animalsData);
    }
    if (selectedPage == "leopard") {
      localStorage.setItem("leopardData", changes);
      const leopardData = JSON.parse(changes);
      renderLeopardData(leopardData);
    }
    if (selectedPage == "yala") {
      localStorage.setItem("yalaData", changes);
      const yalaData = JSON.parse(changes);
      renderYalaData(yalaData);
    }
    if (selectedPage == "wilpattu") {
      localStorage.setItem("wilpattuData", changes);
      const wilpattuData = JSON.parse(changes);
      renderWilpattuData(wilpattuData);
    }
  } else {
    console.error("dont do that");
  }
});
