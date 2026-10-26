import { useState, useEffect } from 'react';

function App() {

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [tasks, setTasks] = useState(() => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
});

  useEffect(() =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])



  const updateTask = () => {
    setTasks(
      tasks.map(task =>
        task.id === editId
          ? { ...task, text: editText }
          : task
      )
    );

    setEditId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">  
        <h1 className="text-3xl font-bold text-center mb-6">
          Task Manager App
        </h1>
        <input 
          type="text" 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className='border border-gray-300 p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          placeholder='Enter a task...'
        />
        <button
        onClick={() => {
          if (task.trim() === "") return;


          setTasks([
            ...tasks, 
            {
              id: Date.now(),
              text: task,
              completed: false,
            },
            ]);
          setTask("")
        }} 
        className='bg-black text-white px-4 py-2 w-full sm:w-auto rounded-lg cursor-pointer hover:bg-gray-800 transition'
        >
          Add Task
        </button>
        <ul className="mt-5">
          {tasks.map((t) => (
            <li
              key={t.id}
              className='className="border border-gray-200 p-3 mt-3 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gray-50"'
            >
          {editId === t.id ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-1 rounded"
              />

              <button
                onClick={updateTask}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <span className={t.completed ? "line-through text-gray-500" : ""}>
              {t.text}
            </span>
          )}
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                  setTasks(tasks.filter(task => task.id !== t.id));
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
                <button
                onClick={() => {
                  setTasks(
                    tasks.map(task =>
                      task.id === t.id
                        ? { ...task, completed: !task.completed }
                        : task
                    )
                  );
                }}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition cursor-pointer"
                >
                {t.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => {
                    setEditId(t.id);
                    setEditText(t.text);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
}

export default App;