import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api"

function Home() {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputEmail = useRef();
  const inputAge = useRef();

  //Lista todos os usuários cadastrados
  async function getUsers() {
    const response = await api.get('/users')
    setUsers(response.data);
  }

  //Cria um novo usuário
  async function createUser() {
    const payload = {
      nome: inputName.current.value,
      email: inputEmail.current.value,
      idade: inputAge.current.value
    };

    await api.post('/users', payload)
    getUsers()
  }

  //Exclui o usuário selecionado
  async function deleteUser(userId) {
    await api.delete(`/users/${userId}`)
    getUsers()
  }

  //Hook listar usuários no carregamento da página
  useEffect(() => {
    getUsers()
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name="name" type="text" ref={inputName} />
          <input placeholder="E-mail" name="email" type="email" ref={inputEmail}/>
          <input placeholder="Idade" name="age" type="number" ref={inputAge}/>

          <button type="button" onClick={createUser}>Cadastrar</button>
        </form>


      {users.map((user) => (
        <div key={user.id} className="card-usuarios">
          <div className="card-infos">
            <p>Nome: <span>{user.name}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
            <p>Idade: <span>{user.age}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} title="Excluir usuário"/>
          </button>
        </div>
      ))}
      </div>
    </>
  );
}

export default Home;
