import React, {useState, useEffect} from "react";


// create your first component
const Home = () => {

	const [tarea, setTarea] = useState("");
	const [listaTareas, setListaTareas] = useState([]);

    
	const handleSubmit  = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
            setListaTareas([...listaTareas, { label: tarea, done: false }]);
            setTarea("");
            modificarTarea([...listaTareas, { label: tarea, done: false }]);
            console.log(listaTareas);
		}
	};
	
    

// Loop through the elements, and hide the parent, when clicked on

const eliminarTarea = (i) => {
	const tareaFiltrada = listaTareas.filter((tarea, index) => {
		if (i !== index) {
			return tarea
		}
	});
	setListaTareas(tareaFiltrada);
	modificarTarea(tareaFiltrada);
};
//creamos usuario
const modificarTarea = async () => {// async/await
	const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/astrid1', {
		method: "PUT",
		body: JSON.stringify([...listaTareas, { label: tarea, done: false }]),
		headers: {
			'Content-Type': "application/json"
		}
	})
	const data = await response.json();
	console.log(data);
}
	
	

//obtenemos lista de tareas
// const obtenerListaTareas = async ()=>{
// 	try{
// 		const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/nor')
// 		const data = await response.json()
// 		// console.log(data);
// 		setListaTareas(data)
// 	}catch(err){
// 		console.log(err);
// 	}
	// .then((response)=>response.json())//me convierte la respuesta en json
	// .then((data)=>setListaTareas(data))//guarda la info json en un objeto
	// .catch((err)=>console.log(err))//me avisa si algo salió mal


    console.log(listaTareas);
    
	useEffect(() => {
        // GET
        fetch('https://assets.breatheco.de/apis/fake/todos/user/astrid1')
            .then((response) => response.json())//me convierte la respuesta en json
            .then((data) => setListaTareas(data))//guarda la info json en un objeto
            .catch((err) => console.log(err))//me avisa si algo salió mal
    }, [])

    

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title d-flex justify-content-center">To Do List</h1>
                    <form className="container">
                        <div className="mb-3">

                            <input type="text" className="form-control" id="exampleInputTarea" aria-describedby="tareaHelp"
                                onChange={
                                    (e) => setTarea(e.target.value)
                                }
                                onKeyDown={handleSubmit}
                                value={tarea}/>
                        </div>


                    </form>
                    <div className="card">
						{/* <p>
						<a href="#" className="btn btn-success" onClick={crearUsuario}>
				If you see this green button... bootstrap is working...
			</a>
						</p> */}
                        <ul className="list-group list-group-flush">
							
			
                            {listaTareas.map((tarea, i) => {
								return (
                                    <li className="list-group-item border border-1 tareaOculta" key={i}>
                                        {tarea.label}<span className="close" onClick={() => eliminarTarea(i)}>x</span>
                                    </li>
                                );
                            })}</ul>

                            <div className="alert-secondary">{listaTareas.length == 0 ? "Sin tareas, agregar tareas." : "Número de tareas: " +listaTareas.length}</div>

                    </div>

                </div>
            </div>
        </div>

    );
						};


export default Home;
