import React, { useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria()
{ 
  const valoresIniciais = {
    nome:'',
    descricao: '',
    cor: '',
  }
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] =  useState(valoresIniciais);

    function setValue( chave, valor){
      setValues({
        ...values, 
        [chave]: valor,
      })
    }

  function handleChange(infosDoEvento){
    // const {getAttribute, value} = infosDoEvento.target;
     setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value
    );
  }

  useEffect(() => {
      console.log("aloalo");
      const URL = 'http://localhost:8080/categorias';
      fetch(URL)
      .then(async (responseServer) => {
        const response = await responseServer.json();
        setCategorias([
          ...response,
        ]);
      });

      // setTimeout(() => {
      //   setCategorias([
      //     ...categorias,
      //     {
      //       "id": 1,
      //       "nome": "Front End",
      //       "descricao": "Uma categoria bacanuda",
      //       "cor": "#6bd1ff"
      //     },
      //     {
      //       "id": 2,
      //       "nome": "Front End",
      //       "descricao": "Uma categoria bacanuda",
      //       "cor": "#6bd1ff"
      //     },
      //     {
      //       "id": 3,
      //       "nome": "Front End",
      //       "descricao": "Uma categoria bacanuda",
      //       "cor": "#6bd1ff"
      //     }
      //   ]);
    // }, 4 * 1000);
  },[]);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>
      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values
        ]);
        setValues(valoresIniciais) 
      }}>

      <FormField 
        label="Nome da Categoria"
        type="text"
        name="nome"
        value={values.nome}
        onChange={handleChange}      
      />

    <FormField 
        label="Descrição"
        type="textarea"
        name="descricao"
        value={values.descricao}
        onChange={handleChange}      
      />
    
      <FormField 
        label="Cor"
        type="color"
        name="cor"
        value={values.cor}
        onChange={handleChange}      
      />
      
        <Button>Cadastrar</Button>
      </form>
      
      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => {
            return (
              <li key={`${categoria}${indice}`}>
                {categoria.nome}
              </li>
            )
      })}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria;