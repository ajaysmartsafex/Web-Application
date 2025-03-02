import React from "react"
import { Outlet } from 'react-router-dom';


function App() {


  return (
    <div className="body_color min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <main>
          <Outlet /> {/* Home should appear here */}
        </main>
      </div>
    </div>
  );
}

export default App;
