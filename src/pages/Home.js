import { useEffect, useState } from "react"
import todoService from "../service/todoService";

const Home = () => {
  const [todo, setTodo] = useState([])

  const getTodo = async () => {
    try {
     const response = await todoService.fetchTodo()
      console.log(response);
      setTodo(response.data.todo.items);
    } catch (error) {
      console.log("failed to axios products: ", error);
    }
  };
  useEffect(() => {
    getTodo();
    
  }, []);
  return (
    <div>
      {todo.map(item => (
        <div key={item.id}>
          <p>{item.content}</p>
        </div>
      ))}
    </div>

  )
}

export default Home