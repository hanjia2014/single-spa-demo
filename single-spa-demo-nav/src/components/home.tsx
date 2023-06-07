import React, { useEffect } from "react";
import { selectUsers } from "../redux/selector/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { IUser, addUser } from "../redux/slice/user.slice";
import { fetchUsers } from "../redux/reducers/user.reducers";

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
  }, []);
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
    </div>  
  );
}