// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Login from './pages/Login';
import './App.css'

function Test(props) {
  console.log(props);
  return (

    <ul>
      {props.items.map(task => <li key={task}>{task}</li>)}
    </ul>
  )
}
// Sử dụng props
// 
function App() {

  // const tasks = ["Test", "Học bài", "Chơi game"];
  return (
    <>
      <Login />
      {/* <Test items={tasks}></Test> */}
    </>
  )
}

export default App
