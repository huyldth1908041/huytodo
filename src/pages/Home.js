import { useEffect, useState } from 'react';
import todoService from '../service/todoService';
import { useQuery } from 'react-query';
const initialTask = {
  todo: { items: [] },
  doing: { items: [] },
  done: { items: [] },
};
const Home = () => {
  const [text, setText] = useState('');

  const { data: task, isLoading, isError, refetch } = useQuery(['todoService.fetchTodo'], () => todoService.fetchTodo());

  const createTaskHandler = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      await todoService.createTodo({ content: text });
      await refetch()
      setText('')
    } catch (err) {
      console.log(err);
    }
  };

  const changeTaskToDone = async (id) => {
    /**
     * Lấy ra id của taSK đã dược lưu vào tham số id của hàm
     * gọi api /todos/changestatus/id
     * gọi hàm getTodo() để reload dữ liệu mới nhất
     * Nhớ  sử dụng try cstch
     *       console.log(id)
     */
    try {
      await todoService.changeStatus(id, { status: 1 });
      await refetch()
      setText('')
    } catch (err) {
      console.log(err);
    }
  };
  const changeTaskDoingToDone = async (id) => {
    try {
      await todoService.changeStatus(id, { status: 2 });
      await refetch()
      setText('')
    } catch (err) {
      console.log(err);
    }
  };

  const removeHandler = async (id) => {
    try {
      await todoService.changeStatus(id, { status: -1 });
      await refetch()
      setText('')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={createTaskHandler}>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='task' />
        <button type='submit'>ADD</button>
      </form>
      <div className='flex'>
        <div className='flex-item'>
          <h4>Todo</h4>
          {isLoading
            ? 'loading...'
            : isError
            ? 'oops errors...'
            : task.data.todo.items.map((item) => (
                <div className='task' key={item.id}>
                  {item.content}
                  <button className='task-btn' onClick={() => changeTaskToDone(item.id)}>
                    doing
                  </button>
                </div>
              ))}
        </div>
        <div className='flex-item'>
          <h4>Doing</h4>
          {isLoading
            ? 'loading...'
            : isError
            ? 'oops errors...'
            : task.data.doing.items.map((item) => (
                <div className='task' key={item.id}>
                  {item.content}
                  <button className='task-btn' onClick={() => changeTaskDoingToDone(item.id)}>
                    done
                  </button>
                </div>
              ))}
        </div>
        <div className='flex-item'>
          <h4>Done</h4>
          {isLoading
            ? 'loading...'
            : isError
            ? 'oops errors...'
            : task.data.done.items.map((item) => (
                <div className='task' key={item.id}>
                  {item.content}
                  <button className='task-btn' onClick={() => removeHandler(item.id)}>
                    remove
                  </button>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Home;
