import React, { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onValue, remove } from "firebase/database";

const App = () => {
  const db = getDatabase();
  const [task, setTask] = useState('');
  const [alltask, setAllTask] = useState([]);



  const handleInput = (e) => {
    setTask(e.target.value);
  }

  const handleSubmit = () => {
    if (task != 0) {
      set(push(ref(db, 'todo/')), {
        task: task
      });
    }
  }

  useEffect(() => {
    const todoRef = ref(db, 'todo/');
    onValue(todoRef, (snapshot) => {
      let array = []
      snapshot.forEach((item)=>{
        array.push({...item.val(), key: item.key })
      })
      setAllTask(array);
    });
  }, [])


   let handleDelete = (key) =>{
      
    remove(ref(db, 'todo/' + key ))
   }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10  lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          TODO
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter your task
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Task
                </label>
                <input
                  onChange={handleInput}
                  value={task}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your task"
                  required=""
                />
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ul className='my-20'>
     
        <li className=''>

          <div className="relative overflow-x-auto">
            <table className="w-[500px] mx-auto text-[16px] text-left text-gray-500">
              <thead className="text-md text-gray-700 uppercase bg-gray-50 ">
                 {alltask.map((value, i)=>(
                   
                   <tr key={i}>
                  <th className='py-2'>
                    {value.task}
                    
                  </th>
                  <button onClick={()=>handleDelete(value.key)} className='py-1 px-4 bg-red-500 text-white rounded-md'>Delete</button>
                </tr>
                 ))}
          

              </thead>
            </table>
          </div>

        </li>

      </ul>
    </section>
  )
}

export default App;

