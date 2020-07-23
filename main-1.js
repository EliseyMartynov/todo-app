// Big thanks to Traversy Media for example

//data class
class Todo {
  constructor(inputed, check) {
    this.inputed = inputed;
    this.check = check;
  }
}

//ui class
class UI {
//  pushing new data to array
    static itemsList() {

    const itemsArray = Storage.getItems();

//    itterate data array and get value to push them into additem function
    itemsArray.forEach(item => UI.addItem(item.inputed, item.check));
};

//    get inputed and class from storage and insert it into html
    static addItem(item, classes) {
      const list = document.querySelector('.todo__list');
      list.insertAdjacentHTML('afterBegin', `<div class="todo__item">
          <input type="checkbox" class="todo__check checkbox-${classes}">
          <span class="span-${classes}">${item}</span>
          <i class="fas fa-eraser todo__eraser" aria-hidden="true"></i>
        </div>`)
    }

//  toggling checker
    static toggleCheck(target) {
      if(target.classList.contains('todo__check')) {
        target.classList.toggle('checkbox-checked');
        target.nextElementSibling.classList.toggle('span-checked');
      }
}

//  remove func
    static removing(target) {
      if(target.classList.contains('todo__eraser')) {
        target.parentElement.remove();

//        and from storage
        Storage.deleteItems(target);
      }
    }

//  reseting
    static reseting() {
      let todoItems = document.querySelectorAll('.todo__item');

//      remove each item in list
      Array.from(todoItems).forEach(item => item.remove());
    }
}

//Storage

class Storage {

//  getting list of our storage
  static getItems() {
    let items;
    // statement: if no items in storage - make an empty array
    if(localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }

//    return what we get
    return items;
  }

  static addItems(item) {
    let items = Storage.getItems();

//    pushing new item
    items.push(item);

//    puhs new items to storage
    localStorage.setItem('items', JSON.stringify(items));
  }

  static deleteItems(target) {
    let items = Storage.getItems();

//    text content of span text
    let whatRemove = target.previousElementSibling.textContent;

//    finding it in array of our items
    let findRemovingItem = items.find(item => item.inputed === whatRemove);

//    finding index of that object in array
    let indexOfRemovingItem = items.indexOf(findRemovingItem);

//    cut it
    items.splice(indexOfRemovingItem, 1);

//    push new items list to storage
    localStorage.setItem('items', JSON.stringify(items));
  }

// changing when checked and insert data to storage

    static checkedOrnot(target) {
      let items = Storage.getItems();
      if(target.classList.contains('todo__check')) {
//      find position in array same as in remove fucn above but in 1 line for shortness
      let checkedItem = items.find(item => item.inputed === target.nextElementSibling.textContent);

//       if true then item becomes checked
      if(target.classList.contains('checkbox-not-checked')) {
        checkedItem.check = 'checked';
        console.log(1);
      } else {
        checkedItem.check = 'not-checked';
        console.log(2);
      }

//      push new items list to storage
      localStorage.setItem('items', JSON.stringify(items));
    }
  }

//  reseting storage
    static resetingStorage() {
      localStorage.clear();
    }
}

//show our list
document.addEventListener('DOMContentLoaded', UI.itemsList);

//inputing new data
const form = document.querySelector('#form');
const input = document.querySelector('#input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

//  create pair key-value
  const newItem = new Todo(input.value, 'not-checked');

//  make it shown
  UI.addItem(newItem.inputed);

//  push to store
  Storage.addItems(newItem);

//  reset input
  input.value = '';
});

//erasing + checker

//have to interact with list beacause other elements we get on fly from class
const todoList = document.querySelector('.todo__list');

todoList.addEventListener('click', (e) => {
//  remove from UI
  UI.removing(e.target);

//  this is for interact with checker
  Storage.checkedOrnot(e.target);

//  toggling styling
  UI.toggleCheck(e.target);
})

//reset

const reset = document.querySelector('.todo__reset');

reset.addEventListener('click', () => {

//  reset in interface
  UI.reseting();

//  reset in storage
  Storage.resetingStorage();
})






