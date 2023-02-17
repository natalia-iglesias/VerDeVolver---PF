export default function validate(form, name) {
  let isError = {
    isError: false,
    errorMsg: '',
  };
  if (form[name].length === 0 && name !== 'cbu') {
    isError = {
      isError: true,
      errorMsg: 'Requerido',
    };
    return isError;
  }
  if (name === 'email') {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    isError = {
      isError: !regex.test(form.email),
      errorMsg: 'Por favor ingresa un email válido.',
    };
  }
  if (name === 'cbu') {
    isError = {
      isError: form.cbu.length !== 22 && form.cbu.length !== 0,
      errorMsg: 'El cbu debe ser de 22 digitos.',
    };
  }
  console.log(name);
  if (name === 'description') {
    isError = {
      isError: form.description.length < 150 || form.description.length > 450,
      errorMsg: 'La descripción debe contener entre 150 y 450 caracteres.',
    };
  }
  return isError;
}
