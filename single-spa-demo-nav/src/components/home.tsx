import React, { useEffect } from "react";
import { selectUsers } from "../redux/selector/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { IUser, addUser } from "../redux/slice/user.slice";
import { fetchUserById, fetchUsers } from "../redux/reducers/user.reducers";
// @ts-ignore
import { setData } from '@han-demo/event-bus';
import { navigateToUrl } from "single-spa";

interface IHomeProps {
  title: string;
}
export const Home: React.FC<IHomeProps> = ({ title }) => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch<any>();
  const addTempUser = () => {
    const user: IUser = {
      id: users.length + 1,
      firstName: "three",
      lastName: "three"
    };
    dispatch(addUser(user as any));
  };
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchUserById({ id: 5 }));
  }, []);

  useEffect(() => {
    setData(users);
  }, [users]);

  const navigate = () => {
    navigateToUrl('child');
  }

  return (
    <div>
      <h1>{title}</h1>
      {users && 
        <>
          <h1>{users.length}</h1>
          <ul>
            {users.map((user: any) => <li key={user.id}>{user.firstName}</li>)}
          </ul>
        </>
      }
      <button onClick={addTempUser}>Add User</button>
      <button onClick={navigate}>open child page</button>
    </div>  
  );
}