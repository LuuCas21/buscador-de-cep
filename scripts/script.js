'use script';

const button_action = document.getElementById('button');
const button_copy_address = document.querySelector('.copy_button');
const button_copy_locale = document.querySelector('.copy_button_locale');
const button_copy_bairro = document.querySelector('.copy_button_bairro');
const button_copy_state = document.querySelector('.copy_button_state');

const input_div_hide = document.querySelectorAll('.input[data-copy]');
const labels_hide = document.getElementsByTagName('label');

let logradouroValue;
let localidadeValue;
let bairroValue;
let estadoValue;

const preencherFormularios = (address) => {
    document.querySelector('#cep').value = address.cep;
    document.querySelector('#address').value = address.logradouro;
    document.querySelector('#city').value = address.localidade;
    document.querySelector('#bairro').value = address.bairro;
    document.querySelector('#state').value = address.uf;
};

const clearInput = () => {
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#state').value = '';
}

const isValidNumber = (number) => /^[0-9]+$/.test(number);

const validCep = (cep) => cep.length === 8 && isValidNumber(cep);

const inputField = async function() {
    const cep_value = document.getElementById('cep').value;
    let input_div = document.querySelectorAll('.input[data-toggle]');
    let labels = document.getElementsByTagName('label');

    const url = `https://viacep.com.br/ws/${cep_value}/json/`;

    if (validCep(cep_value)) {
        const data = await fetch(url);
    
        let address = await data.json();

        logradouroValue = address.logradouro;
        localidadeValue = address.localidade;
        bairroValue = address.bairro;
        estadoValue = address.uf;

        button_copy_address.setAttribute('data-copy', logradouroValue);
        button_copy_locale.setAttribute('data-copy', localidadeValue);
        button_copy_bairro.setAttribute('data-copy', bairroValue);
        button_copy_state.setAttribute('data-copy', estadoValue);
    
    if (address.hasOwnProperty('erro')) {
        document.querySelector('#cep').value = 'CEP não encontrado!';
        clearInput();

        for (let i = 0; i < labels.length; i++) {
            labels[i].classList.add('hide');
        };
    
        input_div.forEach(inputs => {
            inputs.classList.add('hide');
        });

    } else {
        for (let i = 0; i < labels.length; i++) {
            labels[i].classList.remove('hide');
        };
    
        input_div.forEach(inputs => {
            inputs.classList.remove('hide');
        });
    
        preencherFormularios(address);
    };

} else {
    document.querySelector('#cep').value = 'CEP inválido!';
    clearInput();

    for (let i = 0; i < labels.length; i++) {
        labels[i].classList.add('hide');
    };

    input_div.forEach(inputs => {
        inputs.classList.add('hide');
    });
}

};

button_action.addEventListener('click', inputField);

function copyAddress() {
    navigator.clipboard.writeText(button_copy_address.getAttribute('data-copy'));
};

function copyLocale() {
    navigator.clipboard.writeText(button_copy_locale.getAttribute('data-copy'));
}

function copyBairro() {
    navigator.clipboard.writeText(button_copy_bairro.getAttribute('data-copy'));
}

function copyState() {
    navigator.clipboard.writeText(button_copy_state.getAttribute('data-copy'));
}

button_copy_address.addEventListener('click', copyAddress);
button_copy_locale.addEventListener('click', copyLocale);
button_copy_bairro.addEventListener('click', copyBairro);
button_copy_state.addEventListener('click', copyState);