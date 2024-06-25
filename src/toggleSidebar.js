import { getElement } from './utils.js';

const closeBtn = getElement('.sidebar-close');
const showBtn = getElement('.toggle-nav');
const sideBar = getElement('.sidebar-overlay');

closeBtn.addEventListener('click', ()=>{
    sideBar.classList.remove('show');
})


showBtn.addEventListener('click', ()=>{
    sideBar.classList.add('show');
})