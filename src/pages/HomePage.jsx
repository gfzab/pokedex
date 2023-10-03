import { useRef } from "react"
import { setTrainerSlice } from "../store/slices/trainer.slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
   
   useSelector(store => store.trainer)

   const inputTrainer = useRef()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleTrainer = e => {
     e.preventDefault()
     dispatch(setTrainerSlice(inputTrainer.current.value.trim()))
     navigate("/pokedex")
   }  

 
  return (
    <div className="Pagina1">
      <h1>Pokedex</h1>
      <p>To start, Please ! enter your trainer nickname</p>
      <form onSubmit={handleTrainer}>
        <input ref={inputTrainer} type="text" placeholder="write here"  />
        <button>Start!</button>
      </form>
    </div>
  )
}

export default HomePage