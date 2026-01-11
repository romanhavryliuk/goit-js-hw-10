const STORAGE_KEY = 'feedback-form-state';
const formData = {
    email: "",
    message: "",
};

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');
const emailInput = form.querySelector('input[name="email"]');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);
populateForm();


function onFormInput(event) {
    const { name, value } = event.target;
    if (name !== 'email' && name !== 'message') {
      return;
    };
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }
    console.log('formData:', formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
}


function populateForm() {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (!savedValue) {
        return;
    }

    let parsedValue = {};
    try {
        parsedValue = JSON.parse(savedValue);
    } catch {
        return;
    }

    formData.email = (parsedValue.email ?? '').trim();
    formData.message = (parsedValue.message ?? '').trim();
    emailInput.value = formData.email;
    textarea.value = formData.message;
}