let main_container;
let title_container;
let control_menu_container;
let settings_container;

let sprinkle_buttons = [];


function init_app() {
    init_main_container();
    init_control_menu();
    init_settings_menu();

    get_status();
    setInterval(
        get_status,
        5000,
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

    let setting_button = document.createElement('div');
    setting_button.id = 'settings';
    setting_button.className = 'col-10 btn-dark btn-sprinkle m-1 rounded-sm';
    setting_button.innerText = 'Settings';

    setting_button.addEventListener('click', () => {
        show_settings(setting_button);
    })

    row = document.createElement('div');
    row.className = "row justify-content-center";
    row.appendChild(setting_button)
    control_menu_container.appendChild(row);
}


function init_settings_menu() {
    settings_container = document.createElement('div');
    settings_container.id = 'settings_container';
    settings_container.className = 'container-fluid text-center d-none';
    main_container.appendChild(settings_container);

    let row = document.createElement('div');
    row.className = 'row';
    settings_container.appendChild(row);

    let time_picker = document.createElement('input');
    time_picker.id = 'max_time';
    time_picker.setAttribute('type', 'time');
    time_picker.step = '1';
    row.appendChild(time_picker);

    let label = document.createElement('label');
    label.for = 'max_time';
    label.innerText = 'ON Time';
    row.appendChild(label);


    row = document.createElement('div');
    row.className = 'row';
    settings_container.appendChild(row);

    time_picker = document.createElement('input');
    time_picker.id = 'start_time';
    time_picker.setAttribute('type', 'time');
    time_picker.step = '1';
    row.appendChild(time_picker);

    label = document.createElement('label');
    label.for = 'start_time';
    label.innerText = 'Start Time';
    row.appendChild(label);

    let submit_settings_button = document.createElement('button');
    submit_settings_button.className = 'btn btn-dark btn-lg';
    submit_settings_button.innerText = 'Submit Settings';

    row = document.createElement('div');
    row.className = 'row justify-content-center text-center';
    settings_container.appendChild(row);
    row.appendChild(submit_settings_button);
}


function show_settings(settings_button) {
    settings_container.classList.toggle("d-none");

    const request = new XMLHttpRequest();
    request.timeout = 10000;

    let url = `${window.location.host}get_settings`;
    request.onload = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                settings_button_clicked_handler(request);
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

function to_hm(total_seconds) {
  const total_minutes = Math.floor(total_seconds / 60);

  const seconds = total_seconds % 60;
  const hours = Math.floor(total_minutes / 60);
  const minutes = total_minutes % 60;

  return { h: hours, m: minutes, s: seconds };
}

function settings_button_clicked_handler(request) {
    let response = request.responseText.split(',')
    let on_time = parseInt(response[0]);

    let time_picker = document.querySelector('#max_time');
    let conversion = to_hm(on_time);
    time_picker.value = `${conversion.h}:${conversion.m}:${conversion.s}`;
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
