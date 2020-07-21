import React from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = React.useState([]);
  const [state, setState] = React.useState({
    title: '',
    url: '',
    techs: [],
  });
  
  React.useEffect(() => {
    async function loadRepositories() {
      const res = await api.get('repositories');

      setRepositories(res.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: state.title,
      url: state.url,
      techs: state.techs,
    });

    const object = { data };

    const convert = Object.values(object); // Transforma objeto em array

    const dadosArray = convert.concat(repositories);

    setRepositories(dadosArray.map(item => item));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const percorre = repositories.filter(item => item.id !== id);
    setRepositories(percorre);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
          {item.title}
          <button onClick={() => handleRemoveRepository(item.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <div>
        <input type="text" onChange={e => setState({ ...state, title: e.target.value })} placeholder="titulo" />
        <input type="text" onChange={e => setState({ ...state, url: e.target.value })} placeholder="URL GIT" />
        <button type="button">Add Tech</button>
      </div>
      <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
