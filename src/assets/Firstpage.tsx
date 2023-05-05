import { useNavigate } from "react-router-dom"

export const Firstpage = () =>{
    const navigate = useNavigate()
    return(
        <>
            <h1>First page baby</h1>
            <button onClick={() => navigate("/Winpage")}>Winpage!</button>
        </>
    )
}