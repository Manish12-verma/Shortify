import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {
  return (
    <div>
        <Header/>
        <main className="min-h-screen container">
          <Outlet/>
       </main>

      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with ❤️ by Manish Verma
      </div>
    </div>
  )
}

export default AppLayout
