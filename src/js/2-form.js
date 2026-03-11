const form = document.querySelector('.feedback-form');
const formData = {
  email: '',
  message: '',
};
form.addEventListener('input', handleInput);

function handleInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  const parsedData = JSON.parse(savedData);
  form.elements.email.value = parsedData.email;
  form.elements.message.value = parsedData.message;
}

form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData.email = '';
  formData.message = '';
  formData.email = parsedData.email;
  formData.message = parsedData.message;
}
