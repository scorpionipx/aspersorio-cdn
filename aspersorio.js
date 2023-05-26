let body = document.querySelector('body');


let control_menu_container;


function init_app() {
    init_control_menu();
}


function init_control_menu() {
    control_menu_container = document.createElement('div');
    control_menu_container.id = 'control_menu_container';
    control_menu_container.className = 'container-fluid text-center pt-5 control_menu_container';
    
    body.appendChild(control_menu_container);
}


window.addEventListener('load', () => {
    init_app();
})
