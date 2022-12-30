let currentInput = [];
function createApp() {
    let container = document.createElement('div');
    let header = document.createElement('div');
    let logoBlock = document.createElement('div');
    let workSpace = document.createElement('div');
    let contentBlock = document.createElement('div');
    let controlBlock = document.createElement('div');

    let logo = document.createElement('img');
    let length = document.createElement('h5');
    let all = document.createElement('button');
    let active = document.createElement('button');
    let completed = document.createElement('button');
    let clearActive = document.createElement('button');
    let placeholder = document.createElement('div');
    let inputBlock = document.createElement('div');
    let input = document.createElement('input');
    let plusIcon = document.createElement('div');

    logo.src = './img/logo.png';
    all.innerText = 'All tasks';
    active.innerText = 'Active tasks';
    completed.innerText = 'Completed tasks';
    clearActive.innerText = 'Delete all completed tasks';
    input.input = 'Plz, type your plans for today. After that push ENTER. Have a nice day (≧◡≦)';
    plusIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>`;
    
    container.classList = 'container min-vh-100 d-flex flex-column justify-content-lg-between';
    header.classList = 'header row gap-2';
    workSpace.classList = 'workSpace row vh-75';
    contentBlock.classList = 'contentBlock h-100 col-9 order-md-2 overflow-auto';
    controlBlock.classList = 'controlBlock h-75 h-auto col-3 order-md-1 d-flex flex-column gap-1'
    logoBlock.classList = 'col-12 logo h-50 d-flex justify-content-center';
    placeholder.classList = 'row';
    inputBlock.classList = 'col-custom-11-5';
    input.classList = 'main-input form-control input mb-1';
    plusIcon.classList = 'd-flex justify-content-end align-items-center fa-2x col-custom-0-5';
    length.classList = 'length';
    all.classList = 'btn btn-dark';
    active.classList = 'btn btn-primary';
    completed.classList = 'btn btn-success';
    clearActive.classList = 'btn btn-danger';

    let id = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };   

    function CreateNewToDo({id, value, checkeed}){
        let block = document.createElement('div');
        let checkBlock = document.createElement('div');
        let textBlock = document.createElement('div');
        let delBtnBlock = document.createElement('div');
        let check = document.createElement('input');
        let text = document.createElement('span'); 
        let delBtn = document.createElement('a');

        block.classList = 'row align-items-center data border rounded m-3';
        checkBlock.classList = 'col-2 text-star';
        textBlock.classList = 'col-8 text-center text-truncate';
        delBtnBlock.classList = 'col-2 text-end';
        check.classList = 'form-check-input';
        text.classList = `value`;

        check.type = 'checkbox';
        if(checkeed == 'yes'){
            check.checked = true;    
        }
        text.innerText = `${value}`;
        delBtn.innerHTML = `<i class="bi bi-trash fs-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></i>`;

        contentBlock.appendChild(block);
        block.appendChild(checkBlock);
        block.appendChild(textBlock);
        block.appendChild(delBtnBlock);
        checkBlock.appendChild(check);
        textBlock.appendChild(text);
        delBtnBlock.appendChild(delBtn);

        delBtn.onclick = () => {
            currentInput.map((item, i)=>{
            if (item.id == id) {
                let index = item.id;
                currentInput.splice(i, 1);
                localStorage.clear();
                localStorage.setItem('array', JSON.stringify(currentInput))   
            }}
            )
            contentBlock.innerHTML = ``;
            location.hash = '#all';
            checkLength();
            currentInput.map((item) => {CreateNewToDo(item)});
        }

        check.addEventListener("click", () => {
                currentInput.map((item) => {
                    if(item.id == id && item.checkeed == 'not'){
                        item.checkeed = 'yes';
                        checkLength();
                    } else if(item.id == id && item.checkeed == 'yes') {
                        item.checkeed = 'not';
                        checkLength();
                    }
                })
                localStorage.clear();
                localStorage.setItem("array", JSON.stringify(currentInput));
            });
        input.value = ``;
    }


    function checkLength() {
        if(currentInput.length > 0){
            let i = 0;
            workSpace.style.display = 'flex';
            currentInput.forEach((item) => {
                if(item.checkeed == 'yes'){
                    i++;
                };
                return i 
            })
            length.innerText = `Total tasks amount: ${currentInput.length - i}`;
        } else {
            workSpace.style.display = 'none';
        }
    }
    
    input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if(input.value !== '') {
                let variable = {id:id(), checkeed: 'not', value: input.value,};
                currentInput.push(variable);
                localStorage.setItem("array", JSON.stringify(currentInput));
                checkLength();
                if(location.hash === '#all' || location.hash === ''){
                CreateNewToDo(variable);
                }
            } else {
                alert('Your placeholder is empty! Plz fill it and everything will be OK (︶ω︶)');
            }
        } 
    })

    plusIcon.addEventListener('click', () => {
        if(input.value !== '') {
            let variable = {id:id(), checkeed: 'not', value: input.value,};
            currentInput.push(variable);
            localStorage.setItem("array", JSON.stringify(currentInput));
            checkLength();
            if(location.hash === '#all' || location.hash === ''){
            CreateNewToDo(variable);
            }
        } else {
            alert('Your placeholder is empty! Plz fill it and everything will be OK (︶ω︶)');
        }
    })

    all.onclick = () => {
        contentBlock.innerHTML = ``;
        location.hash = '#all';
        currentInput.map((item) => {CreateNewToDo(item)})
    }

    active.onclick = () => {
        contentBlock.innerHTML = ``;
        location.hash = '#active';
        currentInput.map((item) => {
            if(item.checkeed == 'not'){
               CreateNewToDo(item)
            }
        })
    }

    completed.onclick = () => {
        contentBlock.innerHTML = ``;
        location.hash = '#completed';
        currentInput.map((item) => {
            if(item.checkeed == 'yes'){
               CreateNewToDo(item)
            }
        })
    }

    clearActive.onclick = () => {
        let index = [];
        currentInput.forEach((item, i) => {
            if (item.checkeed == 'yes') {
                let iteem = {id: item.id};
                return index.push(iteem);
            }  
        })
        for (var i = 0; i < index.length; i++){
            let cache = index[i];
            for (var j = 0; j < currentInput.length; j++){
                if (cache.id == currentInput[j].id){
                    currentInput.splice(j,1)
                    localStorage.clear();
                    localStorage.setItem('array', JSON.stringify(currentInput))
                }
            }
            contentBlock.innerHTML = ``;
            currentInput.map((item) => {CreateNewToDo(item)})
        }
        checkLength()
        location.hash = '#all';
    }

    document.querySelector('.root').appendChild(container);
    container.appendChild(header);
    header.appendChild(logoBlock);
    header.appendChild(placeholder);
    placeholder.appendChild(inputBlock);
    inputBlock.appendChild(input);
    placeholder.appendChild(plusIcon);
    logoBlock.appendChild(logo);
    container.appendChild(workSpace);
    workSpace.appendChild(contentBlock);
    workSpace.appendChild(controlBlock);
    controlBlock.appendChild(length);
    controlBlock.appendChild(all);
    controlBlock.appendChild(active);
    controlBlock.appendChild(completed);
    controlBlock.appendChild(clearActive);

    // let reloaded  = function(){
    //     currentInput = JSON.parse(localStorage.getItem('array'));
    //     currentInput.map((item) => {CreateNewToDo(item)});
    //     checkLength()
    // } 

    // window.onload = function() {
    // let loaded = localStorage.getItem('loaded');
    // if(loaded) {
    //     reloaded();
    // } else {
    //     localStorage.setItem('loaded', true);
    // }
    // }
};


createApp();