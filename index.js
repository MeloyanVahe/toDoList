// Data for work
const input = document.getElementById('input');
const addButton = document.getElementById('addToDo');
const toDoContainer = document.getElementById('toDoContainer');
const container = document.getElementById('container');
const iDs = [];
const toDoArr = [];

// functions

const createTodo = function (object) {
    const toDoInfo = object.toDoInfo;
    const doing = object.checked ? 'toDoTextDone' : 'toDoText';
    const checked = object.checked ? 'checked' : null;
    const id = object.id;
    return (
        ` <div class='toDoForm' data-id = '${id}'>
<div class='checkbox-wrapper-23'>
    <input class='checkbox' type='checkbox' id=${id} ${checked}/>
    <label for=${id} style='--size: 30px'>
        <svg viewBox='0,0,50,50'>
            <path d='M5 30 L 20 45 L 45 5'></path>
        </svg>
    </label>
</div>
<strong>
  <div class='textWrapper'>
    <p class=${doing}> ${toDoInfo}</p>
  </div> 
</strong>
<button data-class = 'del' class='deleteButton'>
    <svg  class='svg' data-class = 'del' xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none'
        viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'>
        <path data-class = 'del' stroke-linecap='round' stroke-linejoin='round'
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            <div data-class = 'del' class = 'delete'></div>
    </svg>
</button>
</div>`
    );
};

const updateUi = function () {
    Object.keys(localStorage).forEach(key => iDs.push(JSON.parse(localStorage.getItem(key)).id));
    iDs.sort((a, b) => a - b);
    iDs.forEach(id => {
        Object.keys(localStorage).forEach(key => {
            if (+JSON.parse(localStorage.getItem(key)).id === id) {
                toDoArr.push(JSON.parse(localStorage.getItem(key)));
            }
        });
    });
    toDoArr.forEach(todo => {
        toDoContainer.insertAdjacentHTML('afterbegin', createTodo(todo));
    });
};

const addToDo = function () {
    const storageKeys = Object.keys(localStorage);
    let add = true;
    const obj = new ToDoObject(input.value);
    if (input.value.length) {
        storageKeys.forEach(key => {
            if (+key === obj.id) {
                add = false;
            }
        });
        if (add === true) {
            localStorage.setItem(obj.id, JSON.stringify(obj));
            toDoContainer.insertAdjacentHTML('afterbegin', createTodo(obj));
            input.value = '';
        }
    }
};

const buttonFunc = function (e) {
    if (e.target.checked && e.target.className === 'checkbox' || !e.target.checked && e.target.className === 'checkbox') {
        const storageKeys = Object.keys(localStorage);
        const wrapper = e.target.closest('.toDoForm');
        const elemId = wrapper.dataset.id;
        const text = e.target.checked && e.target.className === 'checkbox' ?
            wrapper.querySelector('.toDoText') : !e.target.checked && e.target.className === 'checkbox' ?
                wrapper.querySelector('.toDoTextDone') : {};
        let toDoInfo;
        if (text.className === 'toDoText') {
            text.classList.remove('toDoText');
            text.classList.add('toDoTextDone');
        } else {
            text.classList.remove('toDoTextDone');
            text.classList.add('toDoText');
        }
        storageKeys.forEach(key => {
            console.log(key, elemId);
            if (key === elemId) {
                const obj = JSON.parse(localStorage.getItem(key));
                obj.checked = e.target.checked ? 'checked' : '';
                toDoInfo = obj.toDoInfo;
                localStorage.removeItem(key);
                localStorage.setItem(key, JSON.stringify(obj));
            }
        });
    };
    if (e.target.dataset.class === 'del') {
        const storageKeys = Object.keys(localStorage);
        const wrapper = e.target.closest('.toDoForm');
        const elemId = wrapper.dataset.id;
        storageKeys.forEach(key => {
            if (key === elemId) {
                storageKeys.forEach(key => {
                    if (+key === +elemId) {
                        wrapper.remove();
                        localStorage.removeItem(key);
                    }
                });
            }
        });
    }
};

// Class for making toDo Objects
class ToDoObject {
    constructor(toDoInfo, checked) {
        this.toDoInfo = toDoInfo;
        this.checked = checked;
        this.id = Date.now();
    }
}

// Looping over lokal Storage and updating UI
updateUi();

addButton.addEventListener('click', addToDo);

container.addEventListener('click', buttonFunc);


