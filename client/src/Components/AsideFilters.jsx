//import { materials } from '../db.json';
//import { useEffect, useState } from 'react';
import { VStack, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByMaterials } from '../redux/actions/entitiesActions.js';

const AsideFilters = () => {
  const dispatch = useDispatch();
  //const [materialFilter, setMaterialFilter] = useState('');
  //const [rankingSort, setRankingSort] = useState('');
  const getEntities = useSelector((state) => state.entitiesReducer.entities);
  const { materials } = useSelector((state) => state.entitiesReducer);
  // console.log(materials);
  console.log(getEntities);

  // const handleMaterialChange = (ev) => {
  //   setMaterialFilter(ev.target.value);
  //   //dispatch(filterEntitiesByMaterials(ev.target.value));
  // };

  const handleClikMaterials = (e) => {
    console.log(e.target.value);
    //console.log(getEntities[0].Materials[0].name);

    const filterByMaterial = getEntities.filter((objeto) => {
      // Filtramos los objetos cuya propiedad Materials contenga un objeto con name igual a e.target.value
      return objeto.Materials.some(
        (material) => material.name === e.target.value
      );
    });
    dispatch(filterByMaterials(filterByMaterial));
  };

  const handleRanking = (e) => {};

  return (
    <VStack>
      <Select
        placeholder="Selecciona un material"
        width="-moz-fit-content"
        onClick={(e) => handleClikMaterials(e)}
      >
        {materials.map((m, i) => (
          <option key={i} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Puntuación"
        onClick={(e) => handleRanking(e)}
        width="-moz-fit-content"
      >
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </Select>
    </VStack>
  );
};

export default AsideFilters;
