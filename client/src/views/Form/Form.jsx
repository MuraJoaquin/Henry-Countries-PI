import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries } from "../../redux/actions"
import axios from "axios"
import style from './Form.module.css'


const Form = () => {
    const dispatch = useDispatch()
    
    const countries = useSelector(state => state.countries)
    const [countriesArrayCopy, setCountriesArrayCopy] = useState([])
    const [countriesSelected, setCountriesSelected] = useState([])

    const [form,setForm] = useState({
        name: "",
        difficulty: "",
        duration: "00:00:00",
        season: "",
        countriesId: []
    })
    const [errors,setErrors] = useState({
        name: "*",
        difficulty: "Difficulty required",
        duration: "",
        season: "Season required",
        countriesId: "Choose minimum one country"
    })
    
    const changeHandler = (e) => {
        setErrors(validate({...form,[e.target.name]:e.target.value}))
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const changeHandlerArray = (e) => {
        if(e.target.value !== ""){
            setErrors(validate({...form,[e.target.name]: [...form[e.target.name], e.target.value]}))
            setForm({
                ...form,
                [e.target.name]: [...form[e.target.name], e.target.value]
                })
            const currentCountrySelected = countriesArrayCopy.find(c => c.id === e.target.value)
            setCountriesArrayCopy(countriesArrayCopy.filter(c => c.id !== e.target.value))
            setCountriesSelected([...countriesSelected, currentCountrySelected])
        }
        
        
        // crear un estado local donde me guardo los paises y al eliminar el pais que se eligio del array que mapeo, que me viene por e.target.value y guardarlo en otro estado local
        // donde voy guardando todos los paises seleccionados
        // que se muestre el pais que se eligio debajo como un span, podria crea una constante array que me vaya guardando los paises que se clickearon.
        // Y a cada span asignarle un boton que en su onClick me pushee de nuevo el pais al array que mapeo y que me lo elimine del array donde voy guardando los paises clickeados
    }

    function validate (form) {
        let errors = {}
        if( (/^[A-Za-z]+$/).test(form.name)) errors.name = ""
        else{
           errors.name = "Only letters allowed"
        }
        if(!form.name) errors.name = "*"
        if(form.difficulty) errors.difficulty = ""
        else errors.difficulty = "Difficulty required"

        if(form.season) errors.season = ""
        else errors.season = "Season required"

        if(form.countriesId.length) errors.countriesId = ""
        else errors.countriesId = "Choose minimum one country"

        return errors
    }

    const removeToArray = (e) => {
        e.preventDefault()
        const countryRemoved = countriesSelected.find(c => c.id === e.target.value)
        setCountriesSelected(countriesSelected.filter(c => c.id !== e.target.value))
        setCountriesArrayCopy([...countriesArrayCopy,countryRemoved])
        setForm({
            ...form,
            countriesId: [...form.countriesId.filter(c => c !== e.target.value)]
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/activities',form)
        .then(res => alert('ACTIVITY CREATED SUCCESSFULLY'))
        .catch(err => alert(`The activty with name ${form.name} had been created before, Please try with other activity name`))
    }
    
    useEffect(() =>{
        dispatch(getCountries())
    },[dispatch])

    useEffect(() => {
        countries.sort(function (a,b){
            if(a.name > b.name) return 1
            if(b.name > a.name) return -1
            return 0 
        })
        setCountriesArrayCopy(countries)
    },[countries])


    // const validate = (form) => {
    //     // validate name\
    //     if( (/^[A-Za-z]+$/).test(form.name)){
    //         setErrors({...errors,name:""})
    //     }else{
    //         setErrors({...errors,name:"Only letters allowed"})
    //     }
    //     if(!form.name){setErrors({...errors,name:"*"})} 
    //     if(form.difficulty) setErrors({...errors, difficulty: ""})
    //     if(form.season) setErrors({...errors, season: ""})

    // }
    return(
        <>
        <br></br>
            <p className={style.label}>CREATE THE ACTIVITY!</p>
            <br></br>
            <form className={style.form} onSubmit={(e) => submitHandler(e)}>
                <div>
                    <label className={style.label} htmlFor="name">Choose a name: </label>
                    <input className={style.inputText} type="text" id="name" name="name" value={form.name} onChange={changeHandler}></input>
                    {errors.name && <span className={style.error}> {errors.name}</span>}
                </div>
                <div>
                    <p className={style.label} >Choose a difficulty</p>
                    <input className={style.inputRadio} type="radio" id="1" name="difficulty" value="1"  onChange={changeHandler}></input>
                    <label htmlFor="1">1</label>

                    <input className={style.inputRadio} type="radio" id="2" name="difficulty" value="2" onChange={changeHandler}></input>
                    <label htmlFor="2">2</label>

                    <input className={style.inputRadio} type="radio" id="3" name="difficulty" value="3" onChange={changeHandler}></input>
                    <label htmlFor="3">3</label>

                    <input className={style.inputRadio} type="radio" id="4" name="difficulty" value="4" onChange={changeHandler}></input>
                    <label htmlFor="4">4</label>

                    <input className={style.inputRadio} type="radio" id="5" name="difficulty" value="5" onChange={changeHandler}></input>
                    <label htmlFor="5">5</label>
                </div>
                {errors.difficulty && <span className={style.error}>{errors.difficulty}</span>}
                <div>
                <br></br>
                    <p className={style.label}>Choose the activity duration</p>
                    <select className={style.select} name="duration" onChange={changeHandler}> 
                        <option value="00:00">--⌚-</option> 
                        <option value="01:00">01:00hs</option>
                        <option value="02:00">02:00hs</option>
                        <option value="03:00">03:00hs</option>
                        <option value="04:00">04:00hs</option>
                        <option value="05:00">05:00hs</option>
                        <option value="06:00">06:00hs</option>
                        <option value="07:00">07:00hs</option>
                        <option value="08:00">08:00hs</option>
                        <option value="09:00">09:00hs</option>
                        <option value="10:00">10:00hs</option>
                        <option value="11:00">11:00hs</option>
                        <option value="12:00">12:00hs</option>
                        <option value="13:00">13:00hs</option>
                        <option value="14:00">14:00hs</option>
                        <option value="15:00">15:00hs</option>
                        <option value="16:00">16:00hs</option>
                        <option value="17:00">17:00hs</option>
                        <option value="18:00">18:00hs</option>
                        <option value="19:00">19:00hs</option>
                        <option value="20:00">20:00hs</option>
                        <option value="21:00">21:00hs</option>
                        <option value="22:00">22:00hs</option>
                        <option value="23:00">23:00hs</option>
                        <option value="24:00">24:00hs</option>
                    </select>
                </div>
                <br></br>
                <div >
                    <p className={style.label}>Choose a season of the year</p>
                    <input className={style.inputRadio} type="radio" id="summer" name="season" value="Summer" onChange={changeHandler}></input>
                    <label htmlFor="summer">Summer</label>

                    <input  className={style.inputRadio} type="radio" id="autumn" name="season" value="Autumn" onChange={changeHandler}></input>
                    <label htmlFor="autumn">Autumn</label>

                    <input  className={style.inputRadio} type="radio" id="winter" name="season" value="Winter" onChange={changeHandler}></input>
                    <label htmlFor="winter">Winter</label>

                    <input className={style.inputRadio} type="radio" id="spring" name="season" value="Spring" onChange={changeHandler}></input>
                    <label htmlFor="spring">Spring</label>
                </div>
                {errors.season && <span className={style.error}>{errors.season}</span>}
                <br></br>
                <div>
                    <p className={style.label}>Choose a country/es</p>
                    <select className={style.select} name="countriesId" onChange={changeHandlerArray}>
                        <option value="">---</option>
                        {
                            countriesArrayCopy?.map((c,i) => {
                                return (
                                    <option key={i} value={c.id}>{c.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                {countriesSelected && <p>Selected countries:</p>}
                <div className={style.divImg}>
                {
                            countriesSelected?.map((c,i)=> {
                                return (
                                    <div key={i}><img className={style.img} src={c.flag}></img> <button value={c.id} onClick={(e) => removeToArray(e)}>X</button></div>
                                )
                            })
                        }
                </div>
                {errors.countriesId && <span className={style.error}>{errors.countriesId}</span>}
                <br></br>
                <br></br> 
                <button className={style.buttonSubmit} type="submit" disabled={errors.name || errors.difficulty || errors.season || errors.countriesId || !countriesSelected.length ? true : false}>SUBMIT</button> 

            </form>

        </>
    )
}
export default Form