export default function validate(form, name) {
  let isError = {
    isError: false,
    errorMsg: '',
  };
  if (form[name].length === 0 && name !== 'cbu') {
    console.log('Req', name, form[name]);
    isError = {
      isError: true,
      errorMsg: 'Requerido',
    };
    return isError;
  }
  if (name === 'mail') {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    isError = {
      isError: !regex.test(form.mail),
      errorMsg: 'Por favor ingresa un email válido.',
    };
  }
  if (name === 'cbu') {
    isError = {
      isError: form.cbu.length !== 22 && form.cbu.length !== 0,
      errorMsg: 'El cbu debe ser de 22 digitos.',
    };
  }

  if (name === 'description') {
    isError = {
      isError: form.description.length < 100 || form.description.length > 450,
      errorMsg: 'La descripción debe contener entre 100 y 450 caracteres.',
    };
  }
  return isError;
}
