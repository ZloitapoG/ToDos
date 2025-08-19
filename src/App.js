//import TodoList from "./TodoList";
import { useState } from "react";
//import TodoAdd from "./TodoAdd";
import initialTodos from './todos';
import { Outlet, NavLink } from "react-router-dom";

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const del = key => {
    const newTodos = todos.filter(current => current.key !== key);
    setTodos(newTodos);
  };
  const add = deed => {
    setTodos([...todos, deed]);
  };
  const setDone = key => {
    //const deed = todos.find(current => current.key === key);
    const newTodos = [...todos];
    const deed = newTodos.find(current => current.key === key);
    if (deed) deed.done = true;
    setTodos(newTodos);
  };
  return (
    <div className="container">
      <nav className="navbar is-light">
        <div className="navbar-brand">
          {/*<span className="navbar-item is-uppercase">
            ToDos-1
          </span>*/}
          <NavLink 
              to="/"
              className={({isActive})=> 
                'navbar-item is-uppercase' + 
                (isActive ? ' is-active': '')
              }>
                Делишки
          </NavLink>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
              <NavLink
                to = "/add"
                className = {({isActive})=>
                  'navbar-item' + 
                  (isActive ? ' is-active' : '')
                }
                >
                  Создать дельце
              </NavLink>
          </div>
        </div>
      </nav>
      <main className="content px-6 py-6">
        {/*<h1>Todos</h1>*/}
        {/*<TodoList list={todos} setDone={setDone} del={del} />
        <TodoAdd add = {add}/>*/}
        <Outlet/>
      </main>
    </div>
  );
}