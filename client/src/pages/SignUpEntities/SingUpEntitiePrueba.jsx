import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewEntity,
  getMaterials,
} from '../../redux/actions/entitiesActions';
import validate from './utils';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormErrorMessage,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputGroup,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import UploadImage from '../../Components/Cloudinary';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Form1 = () => {
  console.log('form1');
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    mail: '',
    materials: [],
  });
  const deleteMaterial = (mat) => {
    const newMaterials = form.materials.filter((eachMat) => eachMat !== mat);
    setForm({ ...form, materials: newMaterials });
  };
  const addMaterial = (e) => {
    let newMaterials = [...form.materials];

    newMaterials.push(e.target.value);
    const uniqueMaterials = [...new Set([...newMaterials])];
    setForm({ ...form, materials: uniqueMaterials });
  };
  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);
  const materials = useSelector((state) => {
    return state.entitiesReducer.materials;
  });
  const [errors, setErrors] = useState({
    name: { isError: false, errorMsg: '' },
    mail: { isError: false, errorMsg: '' },
    materials: { isError: false, errorMsg: '' },
  });

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };
  console.log('errros', errors);
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: { isError: false, errorMsg: '' } });
    setForm({ ...form, [name]: value });
  };
  console.log('form', form);

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Participá con tu proyecto en nuestro mapa!
      </Heading>
      <Flex>
        <FormControl isRequired isInvalid={errors.name.isError}>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="name"
            onChange={handlerChange}
            onBlur={handlerBlur}
            type="text"
            value={form.name}
          />
          {!errors.name.isError && form.name.length === 0 ? (
            <FormHelperText>Ingresa el nombre de tu proyecto.</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.name.errorMsg}</FormErrorMessage>
          )}
        </FormControl>
        <br />
        <FormControl isRequired isInvalid={errors.mail.isError}>
          <FormLabel>Email</FormLabel>
          <Input
            name="mail"
            onChange={handlerChange}
            onBlur={handlerBlur}
            type="email"
            value={form.mail}
          />
          {!errors.mail.isError && form.mail.length === 0 ? (
            <FormHelperText>Ingresa el email.</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.mail.errorMsg}</FormErrorMessage>
          )}
        </FormControl>
      </Flex>
      <FormControl isRequired isInvalid={errors.materials.isError}>
        <FormLabel>Materiales Reciclables</FormLabel>
        <Select
          placeholder="Elegir material"
          w="18vw"
          name="materials"
          onChange={(e) => addMaterial(e)}
          onBlur={handlerBlur}
        >
          {materials?.map((mat, i) => {
            return (
              <option key={i} value={mat.id}>
                {mat.name}
              </option>
            );
          })}
        </Select>
        <br />
        {form.materials.map((mat, i) => {
          return (
            <Button key={i} onClick={() => deleteMaterial(mat)}>
              {
                materials.find((material) => {
                  return material.id == mat;
                })?.name
              }
            </Button>
          );
        })}

        {!errors.materials.isError && form.materials.length === 0 ? (
          <FormHelperText>
            Selecciona únicamente los materiales que recibirás.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.materials.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

const Form2 = () => {
  const [form, setForm] = useState({
    description: '',
    img: '',
    cbu: undefined,
  });
  const [errors, setErrors] = useState({
    description: { isError: false, errorMsg: '' },
    img: { isError: false, errorMsg: '' },
    cbu: { isError: false, errorMsg: '' },
  });

  const [msg, setMsg] = useState('');
  const [descMsg, setdescMsg] = useState('');

  const handleUploadImage = (url) => {
    setForm({ ...form, img: url });
  };

  const handlerBlur = (ev) => {
    const errOjb = validate(form, ev.target.name);
    setErrors({ ...errors, [ev.target.name]: errOjb });
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: { isError: false, errorMsg: '' } });

    if (name === 'cbu') {
      if (form.cbu !== undefined) {
        setMsg(value.length);
        if (name === 'cbu' && value.length === 22) {
          return;
        }
      }
      if (name === 'description') {
        setdescMsg(value.length);
      }
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <FormControl isRequired isInvalid={errors.description.isError}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          onChange={handlerChange}
          onBlur={handlerBlur}
          name="description"
          placeholder="Ingresa una descripción..."
          value={form.description}
        />
        {form.description.length !== 0 && !errors.description.isError ? (
          <FormHelperText>Caracteres {descMsg} de 70 hasta 450</FormHelperText>
        ) : (
          ''
        )}
        {!errors.description.isError && form.description.length === 0 ? (
          <FormHelperText>
            Cuéntanos brevemente sobre tu proyecto.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.description.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={errors.img.isError}>
        <FormLabel>Imagen</FormLabel>
        <UploadImage
          onUpload={handleUploadImage}
          onChange={handlerChange}
          onBlur={handlerBlur}
        />
        {!errors.img.isError && form.img.length === 0 ? (
          <FormHelperText>Sube tu imagen aqui.</FormHelperText>
        ) : (
          <FormErrorMessage>{errors.address.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
      <br />
      <FormControl isInvalid={errors.cbu.isError}>
        <FormLabel>CBU</FormLabel>
        <Input
          name="cbu"
          onChange={handlerChange}
          onBlur={handlerBlur}
          type="number"
          value={form.cbu}
        />
        {form.cbu !== undefined && !errors.cbu.isError ? (
          <FormHelperText>Debes ingresar 22 números y vas {msg}</FormHelperText>
        ) : (
          ''
        )}
        {!errors.cbu.isError && form.cbu === undefined ? (
          <FormHelperText>
            Puedes ingresar tu CBU para recibir donaciones.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.cbu.errorMsg}</FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

const Form3 = () => {
  const [mapCenter, setMapCenter] = useState({ lat: -39, lng: -64 });
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(5);

  const [form, setForm] = useState({
    address: '',
    lat: '',
    lng: '',
  });

  const handlePlaceSelected = (e) => {
    const latitude = e.geometry.location.lat();
    const longitude = e.geometry.location.lng();
    setMapCenter({
      lat: latitude,
      lng: longitude,
    });
    setZoom(13);
    setActiveMarker(e);
    setForm((prevForm) => {
      return {
        ...prevForm,
        address: e.formatted_address,
        lat: latitude,
        lng: longitude,
      };
    });
  };
  return (
    <Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
      >
        {activeMarker && (
          <Marker
            position={{
              lat: activeMarker.geometry.location.lat(),
              lng: activeMarker.geometry.location.lng(),
            }}
          />
        )}
      </GoogleMap>
      <FormControl padding="5%" width={500} margin="3%">
        <FormControl isRequired>
          <FormLabel>Dirección</FormLabel>
          <Box align="center">
            <Autocomplete
              onPlaceSelected={(e) => handlePlaceSelected(e)}
              style={autocompleteStyle}
              options={{
                types: ['address'],
                componentRestrictions: { country: 'ar' },
              }}
            />
          </Box>
        </FormControl>
      </FormControl>
    </Box>
  );
};

const SingUpEntitiePrueba = () => {
  console.log('multistep::');
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  //   const handlerSubmit = async (event) => {
  //     event.preventDefault();
  //     // let errorsObj = {};
  //     // Object.keys(form).forEach((name) => {
  //     //   const errOjb = { [name]: validate(form, name) };
  //     //   errorsObj = { ...errorsObj, ...errOjb };
  //     // });
  //     // setErrors({ ...errors, ...errorsObj });

  //     // const isError = Object.keys(errors).find(
  //     //   (error) => errorsObj[error].isError
  //     // );

  //     // if (isError) {
  //     //   return;
  //     // }

  //     dispatch(createNewEntity(form));
  //     navigate('/home');
  //   };
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="green"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  console.log('next click');
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="green"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                // onSubmit={handlerSubmit}
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
};
export default SingUpEntitiePrueba;

const autocompleteStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
};

const containerStyle = {
  width: '50vw',
  height: '50vh',
  position: 'absolute',
  right: '10vw',
  top: '50vh',
};
