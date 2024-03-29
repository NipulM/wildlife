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

// Fetching and rendering Yala data
const yalaDataUrl = "/json-files/yala.json";
const fetchYalaData = async () => {
  const yalaData = await fetchData(yalaDataUrl);
  renderYalaData(yalaData);
};

fetchYalaData();

const renderYalaData = function (data) {
  data.forEach((el) => {
    console.log(el);
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
const wilpattuDataUrl = "/json-files/wilpattu.json";
const fetchWilpattuData = async () => {
  const wilpattuData = await fetchData(wilpattuDataUrl);
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
