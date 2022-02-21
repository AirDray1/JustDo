let currentInput = [];
function createApp() {
    let container = document.createElement('div');
    let logoBlock = document.createElement('div');
    let placeholderBlock = document.createElement('div');
    let inputsBlock = document.createElement('div');
    let result = document.createElement('div');

    let logo = document.createElement('h1');
    let length = document.createElement('h5');
    let all = document.createElement('button');
    let active = document.createElement('button');
    let completed = document.createElement('button');
    let clearActive = document.createElement('button');
    let placeholder = document.createElement('input');

    logo.innerText = 'toDoList';
    all.innerText = 'Всё';
    active.innerText = 'Активные';
    completed.innerText = 'Выполненные';
    clearActive.innerText = 'Удалить выполненные';
    placeholder.placeholder = 'Чем ты хочешь сегодня заняться?';
    
    container.classList = 'container';
    inputsBlock.classList = 'inputsBlock';
    logoBlock.classList = 'text-center';
    placeholder.classList = 'form-control placeholder';
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

        block.classList = 'row align-items-center data';
        checkBlock.classList = 'col text-star';
        textBlock.classList = 'col text-center';
        delBtnBlock.classList = 'col text-end';
        check.classList = 'form-check-input';
        text.classList = `value`;

        check.type = 'checkbox';
        if(checkeed == 'yes'){
            check.checked = true;    
        }
        text.innerText = `${value}`;
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>`;

        inputsBlock.appendChild(block);
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
                console.log(index);
                currentInput.splice(i, 1);
                localStorage.clear();
                localStorage.setItem('array', JSON.stringify(currentInput))   
            }}
            )
            inputsBlock.innerHTML = ``;
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
        placeholder.value = ``;
    }


    function pushArr(item){
        currentInput.push({id: item.id, checkeed: item.checkeed, value: item.value,}); 
    }

    function checkLength() {
        if(currentInput.length > 0){
            let i = 0;
            result.appendChild(all);
            result.appendChild(active);
            result.appendChild(completed);
            result.appendChild(clearActive);
            result.style.display = 'block';
            
            currentInput.forEach((item) => {
                if(item.checkeed == 'yes'){
                    i++;
                };
                return i 
            })
            length.innerText = `Количество дел: ${currentInput.length - i}`;
        } else {
            result.style.display = 'none';
        }
    }
    
    placeholder.addEventListener('keydown', function creatInput(e) {
        if (e.keyCode === 13) {
            let variable = {id:id(), checkeed: 'not', value: placeholder.value,};
            pushArr(variable);
            localStorage.setItem("array", JSON.stringify(currentInput));
            checkLength();
            if(location.hash === '#all'){
            CreateNewToDo(variable);
            }
        }
    })

    all.onclick = () => {
        inputsBlock.innerHTML = ``;
        location.hash = '#all';
        currentInput.map((item) => {CreateNewToDo(item)})
    }

    active.onclick = () => {
        inputsBlock.innerHTML = ``;
        location.hash = '#active';
        currentInput.map((item) => {
            if(item.checkeed == 'not'){
               CreateNewToDo(item)
            }
        })
    }

    completed.onclick = () => {
        inputsBlock.innerHTML = ``;
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
            inputsBlock.innerHTML = ``;
            currentInput.map((item) => {CreateNewToDo(item)})
        }
        checkLength()
        location.hash = '#all';
    }

    document.body.appendChild(container);
    container.appendChild(logoBlock);
    container.appendChild(placeholderBlock);
    container.appendChild(inputsBlock);
    container.appendChild(result);
    result.appendChild(length);
    logoBlock.appendChild(logo);
    placeholderBlock.appendChild(placeholder);

    let reloaded  = function(){
        currentInput = JSON.parse(localStorage.getItem('array'));
        currentInput.map((item) => {CreateNewToDo(item)});
        checkLength()
    } //страницу перезагрузили

    window.onload = function() {
    let loaded = localStorage.getItem('loaded');
    if(loaded) {
        reloaded();
    } else {
        localStorage.setItem('loaded', true);
    }
    }
};


createApp();