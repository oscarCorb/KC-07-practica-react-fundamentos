import React, { useEffect, useState } from 'react';

import { getTags } from '../../../api/products';

import FormField from '../../shared/FormField';
import FormButton from '../../shared/FormButton';

const CreateNewProductForm = (props) => {
  const [inputValues, setInputValues] = useState({
    name: '',
    price: 0,
    tags: [],
    sale: true,
    photo: '',
  });

  // TODO solucionar esto:
  // ??? creo que estoy manejando el estado de TAGS dos veces ???
  // hacer la petición de los tags en un componente independiente
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getTagList = async () => {
      const tags = await getTags();
      setTags(tags);
    };
    getTagList();
  }, []);

  const handleChange = (event) => {
    let value = event.target.value;

    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

    setInputValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: value,
    }));
  };

  const handleSelect = (selectedItems) => {
    const tags = [];
    for (let i = 0; i < selectedItems.length; i++) {
      tags.push(selectedItems[i].value);
    }
    setInputValues((oldValues) => ({
      ...oldValues,
      tags: tags,
    }));
  };

  const handleChangeUploadImg = (e) => {
    if (e.target.files.length) {
      setInputValues((oldValues) => ({
        ...oldValues,
        photo: e.target.files[0],
      }));
    }
  };

  const handleSubmit = (event) => {
    inputValues.price = inputValues.price * 1;
    // inputValues.sale = inputValues.sale;
    event.preventDefault();
    props.onSubmit(inputValues);
    setInputValues({
      name: '',
      price: '',
      sale: '',
      tags: [],
      photo: '',
    });
  };

  const formValidation = () => {
    if (
      inputValues.name.length > 0 &&
      inputValues.price.length > 0 &&
      inputValues.tags.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form className="createNewProductForm" onSubmit={handleSubmit}>
      {/* NAME, PRICE */}
      <FormField
        type="text"
        name="name"
        label="Nombre del producto"
        value={inputValues.name}
        className="createNewProductForm-field"
        onChange={handleChange}
        autofocus
      />
      <FormField
        type="number"
        name="price"
        label="Precio"
        value={inputValues.price}
        className="createNewProductForm-field"
        onChange={handleChange}
      />

      {/* SALE */}
      <label>Tipo de anuncio</label>
      <fieldset>
        <label>
          Venta
          <input
            type="radio"
            name="sale"
            value={true}
            checked={inputValues.sale === true}
            className="createNewProductForm-radio"
            onChange={handleChange}
          />
        </label>
        <label>
          Compra
          <input
            type="radio"
            name="sale"
            value={false}
            checked={inputValues.sale === false}
            className="createNewProductForm-radio"
            onChange={handleChange}
          />
        </label>
      </fieldset>

      {/* TAGS */}
      <label>
        Categorías
        <fieldset>
          <select
            value={inputValues.tags}
            multiple={true}
            onChange={(e) => {
              handleSelect(e.target.selectedOptions);
            }}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </fieldset>
      </label>

      {/* IMAGE */}
      <input
        type="file"
        id="uploadFileButton"
        onChange={handleChangeUploadImg}
      ></input>

      {/* BUTTON */}
      <FormButton
        cName="is-info"
        buttonText="Enviar"
        onClick={handleSubmit}
        formValidation={formValidation}
      ></FormButton>
    </form>
  );
};

export default CreateNewProductForm;
