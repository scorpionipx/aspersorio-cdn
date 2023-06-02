let main_container;
let title_container;
let control_menu_container;

let sprinkle_buttons = [];


function init_app() {
    init_main_container();
    init_control_menu();

    get_status();
    setInterval(
        get_status,
        2000,
    )
}


function init_main_container() {
    main_container = document.createElement('div');
    main_container.id = 'main_container';
    main_container.className = 'container-fluid text-center pt-5 main_container';
    document.body.appendChild(main_container);

    title_container = document.createElement('div');
    title_container.id = 'title_container';
    title_container.className = 'container-fluid text-center';
    main_container.appendChild(title_container);

    let row = document.createElement('div');
    row.className = 'row justify-content-center text-center';
    main_container.appendChild(row);

    let title = document.createElement('div');
    title.className = 'col-10 btn-dark m-1 rounded-sm';
    title.innerText = 'Aspersorio'
    row.appendChild(title);
}


function init_control_menu() {
    control_menu_container = document.createElement('div');
    control_menu_container.id = 'control_menu_container';
    control_menu_container.className = 'container-fluid text-center pt-5 control_menu_container';

    main_container.appendChild(control_menu_container);

    let sprinkle_buttons_pair;

    for (let i = 0; i < 10; i++) {
        if (i%2===0) {
            sprinkle_buttons_pair = null;
            sprinkle_buttons_pair = document.createElement('div');
            sprinkle_buttons_pair.className = "row justify-content-center";
        }

        let sprinkle_button = document.createElement('div');
        sprinkle_button.id = 'b' + (i).toString();
        sprinkle_button.className = 'col-5 btn-dark btn-sprinkle m-1 rounded-sm';
        sprinkle_button.innerText = (i + 1).toString();
        sprinkle_button.addEventListener('click', () => {
            sprinkle_button_clicked(sprinkle_button);
        })
        sprinkle_buttons_pair.appendChild(sprinkle_button)
        if (i%2) {
            control_menu_container.appendChild(sprinkle_buttons_pair);
        }
        sprinkle_buttons.push(sprinkle_button);
    }

    let all_sprinkles_off_button = document.createElement('div');
    all_sprinkles_off_button.id = 'all_off';
    all_sprinkles_off_button.className = 'col-10 btn-dark btn-sprinkle m-1 rounded-sm';
    all_sprinkles_off_button.innerText = 'All Off';

    all_sprinkles_off_button.addEventListener('click', () => {
        all_sprinkles_off(all_sprinkles_off_button);
    })

    let row = document.createElement('div');
    row.className = "row justify-content-center";
    row.appendChild(all_sprinkles_off_button)
    control_menu_container.appendChild(row);

    let auto_sprinkles_button = document.createElement('div');
    auto_sprinkles_button.id = 'auto';
    auto_sprinkles_button.className = 'col-10 btn-dark btn-sprinkle m-1 rounded-sm';
    auto_sprinkles_button.innerText = 'Auto';

    auto_sprinkles_button.addEventListener('click', () => {
       auto_sprinkles(auto_sprinkles_button);
    })

    row = document.createElement('div');
    row.className = "row justify-content-center";
    row.appendChild(auto_sprinkles_button)
    control_menu_container.appendChild(row);
}


function auto_sprinkles(sprinkle_button) {
    disable_input();
    const request = new XMLHttpRequest();
    request.timeout = 10000;

    let url = `${window.location.host}auto`;
    request.onload = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sprinkle_button_clicked_handler(request);
            } else {
                sprinkle_button_clicked_error_handler(request);
            }
        }
    };

    request.onerror = () => {
        sprinkle_button_clicked_error_handler(request);
    };

    request.ontimeout = () => {
        sprinkle_button_clicked_timeout_handler(request);
    };
    request.open("GET", url, true);
    request.send(null);
}


function all_sprinkles_off(sprinkle_button) {
    disable_input();
    const request = new XMLHttpRequest();
    request.timeout = 10000;

    let url = `${window.location.host}all_bits_off`;
    request.onload = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sprinkle_button_clicked_handler(request);
            } else {
                sprinkle_button_clicked_error_handler(request);
            }
        }
    };

    request.onerror = () => {
        sprinkle_button_clicked_error_handler(request);
    };

    request.ontimeout = () => {
        sprinkle_button_clicked_timeout_handler(request);
    };
    request.open("GET", url, true);
    request.send(null);
}


function sprinkle_button_clicked(sprinkle_button) {
    disable_input();
    const request = new XMLHttpRequest();
    request.timeout = 10000;

    let url = `${window.location.host}toggle_bit_${parseInt(sprinkle_button.id[1])}`;

    request.onload = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sprinkle_button_clicked_handler(request);
            } else {
                sprinkle_button_clicked_error_handler(request);
            }
        }
    };

    request.onerror = () => {
        sprinkle_button_clicked_error_handler(request);
    };

    request.ontimeout = () => {
        sprinkle_button_clicked_timeout_handler(request);
    };
    request.open("GET", url, true);
    request.send(null);
}


function sprinkle_button_clicked_handler (request) {
    let response = request.responseText.split(',')
    let value = parseInt(response[0]);
    let auto_status = parseInt(response[1]);

    let auto_btn = document.querySelector('#auto');
    if (auto_status) {
        auto_btn.innerText = `Auto [${auto_status}/10]`;
    }
    else {
        auto_btn.innerText = `Auto [off]`;
    }

    console.log('auto status: ' + auto_status);
    for (let index=0; index < 10; index ++) {
        let btn = document.querySelector(`#b${index}`);
        if((value >> index) & 1) {
            btn.classList.remove('btn-dark');
            btn.classList.add('btn-info');
        }
        else {
            btn.classList.remove('btn-info');
            btn.classList.add('btn-dark');
        }
    }
    enable_input()
}


function disable_input() {
    // pb.classList.toggle('d-none');
    sprinkle_buttons.forEach(button => {
        button.style.pointerEvents = 'none';
    })
}
function enable_input() {
    // pb.classList.toggle('d-none');
    sprinkle_buttons.forEach(button => {
        button.style.pointerEvents = 'auto';
    })
}


function sprinkle_button_clicked_error_handler (request) {
    console.log('error');
    console.log(request.responseText)
}


function sprinkle_button_clicked_timeout_handler (request) {
    console.log('timeout');
}


function get_status() {
    disable_input();
    const request = new XMLHttpRequest();
    request.timeout = 10000;

    let url = `${window.location.host}get_status`;
    request.onload = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sprinkle_button_clicked_handler(request);
            } else {
                sprinkle_button_clicked_error_handler(request);
            }
        }
    };

    request.onerror = () => {
        sprinkle_button_clicked_error_handler(request);
    };

    request.ontimeout = () => {
        sprinkle_button_clicked_timeout_handler(request);
    };
    request.open("GET", url, true);
    request.send(null);
}


window.addEventListener('load', () => {
    init_app();
})
