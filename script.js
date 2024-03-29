const wilpattuDataUrl = "/json-files/wilpattu.json";

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

const fetchWilpattuData = async () => {
  const wilpattuData = await fetchData(wilpattuDataUrl);
  renderWilpattuData(wilpattuData);
};

fetchWilpattuData();

const renderWilpattuData = function (data) {
  data.forEach((el) => {
    let introductionDiv = document.querySelector(".introdcution");
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
