import React, { useCallback, useEffect, useState } from "react";
import { selectUsers } from "../redux/selector/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { IUser, addUser, updateUserSelect } from "../redux/slice/user.slice";
import { fetchAsyncUserById, fetchAsyncUsers } from "../redux/reducers/user.reducers";
import { useGetPokemonByNameQuery } from '../services/pokemon';
// @ts-ignore
import { setData, e } from '@han-demo/event-bus';
import { navigateToUrl } from "single-spa";
import { HelloPanel } from "./hello-panel";

interface IHomeProps {
  title: string;
}

export const Home: React.FC<IHomeProps> = ({ title }) => {
  const [message, setMessage] = useState();
  const users = useSelector(selectUsers);
  const dispatch = useDispatch<any>();

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  const addTempUser = () => {
    const user: IUser = {
      id: users.length + 1,
      firstName: "John",
      lastName: "Doe"
    };
    dispatch(addUser(user as any));
  };
  useEffect(() => {
    dispatch(fetchAsyncUsers(null));
    dispatch(fetchAsyncUserById({ userId: 5 }));
    e.on('received', handleMessage);
  }, []);

  useEffect(() => {
    setData(users);
  }, [users]);

  const navigate = (path: 'child' | 'ng') => {
    navigateToUrl(path);
  }

  const handleUserSelect = useCallback(
    id => {
      console.log(`[Hook]user selected: ${id}`);
      dispatch(updateUserSelect({ id }))
    }, [users]
  );

  const handleMessage = message => {
    setMessage(message.text);
  }

  const sendMessage = evt => {
    evt.preventDefault();
    e.emit('message', { text: 'hello from nav' });
  }

  return (
    <div>
      <HelloPanel message={title}>
        <p>This is the demo site</p>
      </HelloPanel>
      {users &&
        <>
          <h1>{users.length}</h1>
          <ul>
            {users.map((user: any) => <li key={user.id}>{user.firstName} <button onClick={() => handleUserSelect(user.id)}>Select</button></li>)}
          </ul>
        </>
      }
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
      <button onClick={addTempUser}>Add User</button>
      <button onClick={sendMessage}>Say Hello</button>
      <button onClick={e => navigate('child')}>open child page</button>
      <button onClick={e => navigate('ng')}>open angular page</button>
    </div>
  );
}