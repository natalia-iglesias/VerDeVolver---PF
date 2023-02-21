export default function validate(form, name) {
  let isErrorObj = {
    isError: false,
    errorMsg: '',
  };
  if (form[name].length === 0 && name !== 'cbu') {
    isErrorObj = {
      isError: true,
      errorMsg: 'Requerido',
    };
    return isErrorObj;
  }
  if (name === 'mail') {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    isErrorObj = {
      isError: !regex.test(form.mail),
      errorMsg: 'Por favor ingresa un email válido.',
    };
  }
  if (name === 'cbu') {
    console.log('cbu', form.cbu.length);
    isErrorObj = {
      isError: form.cbu.length < 21 && form.cbu.length !== 0,
      errorMsg: 'El cbu debe ser de 22 digitos.',
    };
  }

  if (name === 'description') {
    isErrorObj = {
      isError: form.description.length < 70 || form.description.length > 450,
      errorMsg: 'La descripción debe contener entre 70 y 450 caracteres.',
    };
  }
  return isErrorObj;
}
