for (let data of imageWrapperData) {
    let activePage = data.activePage;
    const container = document.querySelector(`#${data.id}`);
    let paginationContainer = document.createElement("div");
    paginationContainer.setAttribute("class", "pagination-container");
    paginationContainer.innerHTML = '<div class="pagination-btn-wrapper" id="pagination-' + data.index + '"></div>';
    container.appendChild(paginationContainer);
    const pagination = document.querySelector('#pagination-' + data.index);
    pagination.innerHTML =
        '<button class="prev-btn prev-btn-' + data.index + ' btn"><i class="fas fa-arrow-left"></i></button><div class="btn-wrapper" id="btn-wrapper-' + data.index + '"></div><button class="next-btn next-btn-' + data.index + ' btn"><i class="fas fa-arrow-right"></i></button>';
    paginationContainer.appendChild(pagination);
    const btnWrapper = document.querySelector(`#btn-wrapper-${data.index}`);
    let btnsContainer = document.createElement("div");
    btnsContainer.innerHTML = "";
    let currentImgCount = 1;
    for (let page = 0; page < Math.ceil(data.imageCount / data.perPage); page++) {
        let btn = document.createElement("button");
        btn.setAttribute("class", `btn count-btn`);
        btn.setAttribute("id", `btn-${page + 1}`);
        btn.setAttribute("name", `${page + 1}`);
        btn.setAttribute("data-name", `container-${page + 1}`);
        btn.innerHTML = `${page + 1}`;
        btnsContainer.appendChild(btn);

        let innerContainer = document.createElement("div");
        innerContainer.setAttribute("class", "inner-container");
        innerContainer.setAttribute("id", `inner-container-${page + 1}`);
        let imageCount = 0;
        if (page + 1 === Math.ceil(data.imageCount / data.perPage)) {
            imageCount = data.imageCount % data.perPage || data.perPage;
        } else {
            imageCount = data.perPage;
        }
        for (let i = 0; i < imageCount; i++) {
            let imageWrapper = document.createElement("div");
            imageWrapper.setAttribute("class", "image-wrapper");
            imageWrapper.innerHTML =
                `<article class="sigma_post">
            <div class="sigma_post-gallery">
              <img src="${data.folderPath}/${currentImgCount}.jpg" alt="post">
            </div>
          </article>`;
            innerContainer.appendChild(imageWrapper);
            currentImgCount++;
        }
        container.appendChild(innerContainer);
    }
    btnWrapper.appendChild(btnsContainer);

    const btnsArray = btnWrapper.querySelectorAll('.count-btn');
    const prevBtn = pagination.querySelector('.prev-btn');
    const nextBtn = pagination.querySelector('.next-btn');

    const showImages = (page) => {
        const innerContainer = container.querySelector(`#inner-container-${page}`);
        const allInnerContainers = container.querySelectorAll('.inner-container');
        allInnerContainers.forEach(container => container.style.display = 'none');
        innerContainer.style.display = 'grid';
    }

    const updateActivePage = (page) => {
        activePage = page;
        btnsArray.forEach(btn => btn.classList.remove('active'));
        const activeBtn = btnWrapper.querySelector(`#btn-${page}`);
        activeBtn.classList.add('active');
        if (activePage === 1) {
            let prevBtn = document.querySelector(`.prev-btn-${data.index}`);
            prevBtn.setAttribute("disabled", true);
            let nextBtn = document.querySelector(`.next-btn-${data.index}`);
            nextBtn.removeAttribute("disabled");
        } else if (activePage === Math.ceil(data.imageCount / data.perPage)) {
            let prevBtn = document.querySelector(`.prev-btn-${data.index}`);
            prevBtn.removeAttribute("disabled");
            let nextBtn = document.querySelector(`.next-btn-${data.index}`);
            nextBtn.setAttribute("disabled", true);
        } else {
            let prevBtn = document.querySelector(`.prev-btn-${data.index}`);
            prevBtn.removeAttribute("disabled");
            let nextBtn = document.querySelector(`.next-btn-${data.index}`);
            nextBtn.removeAttribute("disabled");
        }
    }

    btnsArray.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const page = parseInt(event.target.getAttribute('name'));
            showImages(page);
            updateActivePage(page);
        });
    });

    prevBtn.addEventListener('click', () => {
        const prevPage = activePage > 1 ? activePage - 1 : activePage;
        showImages(prevPage);
        updateActivePage(prevPage);
    });

    nextBtn.addEventListener('click', () => {
        const nextPage = activePage < Math.ceil(data.imageCount / data.perPage) ? activePage + 1 : activePage;
        showImages(nextPage);
        updateActivePage(nextPage);
    });

    showImages(data.activePage);
    updateActivePage(data.activePage);
}
