import React,{useState,useReducer} from "react";
import "./App.css"
function reducer(state,action) {
  switch (action.type) {
    case 'add-todo':
      return{
        todos: [...state.todos,{text:action.text,completed:false}]
      }
    case 'toggle-todo':
      return{
          todos: state.todos.map((t,index) =>
          index === action.index ? {...t,completed: !t.completed} : t
          )
      }
    case 'remove-todo':
      return{
       todos: state.todos.filter(item => item.completed === false)
      }
    default:
      return state;
  }
}

function App() {
  const [{todos}, dispatch] = useReducer(reducer,{ todos: [] });
  const [text,setText] = useState();

  return(
      <div className="container">
        <form className = "form" onSubmit={e => {
          e.preventDefault();
          dispatch( {type:'add-todo',text} )
          setText(" ");
        }}>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Input Todo"/>
          <button className = "go">ADD</button>
          <button className = "clear" onClick={() => dispatch({type:'remove-todo'})}>Clear</button>
        </form>
            {todos.map((t,index) =>
                <div
                    key = {t.text}
                     onClick={() => dispatch({ type:'toggle-todo',index })}
                     style={{
                       textDecoration: t.completed ? "line-through" : ""
                     }}
                >
                 <div className="text_center">
                   {t.text}
                 </div>

            </div>)}



      </div>
  )
}
export default App;