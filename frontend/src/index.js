import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)

/*
axios.get('http://localhost:3001/initialTasks').then((response) => {
    const initialTasks = response.data
        ReactDOM.createRoot(document.getElementById('root')).render(<App initialTasks={initialTasks}/>)
    }
)

*/
