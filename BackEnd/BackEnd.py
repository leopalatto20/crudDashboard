from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pymysql
from pymysql.cursors import DictCursor
import uvicorn
from datetime import datetime


# conexión a la base de datos
def get_connection():
    return pymysql.connect(
        host="localhost",
        user="team1",
        password="team1",
        database="videojuego",
        cursorclass=DictCursor,
    )


app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Prueba"}


class MaestroLogin(BaseModel):
    Correo: str
    Grupo: str


class SesionNivel(BaseModel):
    IDAlumno: int
    NumNivel: int
    Aciertos: int
    Errores: int
    Tiempo: str


@app.post("/alumno/login")
async def alumno_login(
    Genero: str = Form(...), Grupo: str = Form(...), NumLista: int = Form(...)
):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT IDAlumno FROM Alumno WHERE Genero = %s AND Grupo = %s AND NumLista = %s",
                (Genero, Grupo, NumLista),
            )
            result = cursor.fetchone()
            if result:
                return {"Valido": True, "IDAlumno": result["IDAlumno"]}
            else:
                return {"Valido": False, "IDAlumno": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/maestro/login")
async def maestro_login(maestro: MaestroLogin):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT IDMaestro FROM Maestro WHERE Correo = %s AND Grupo = %s",
                (maestro.Correo, maestro.Grupo),
            )
            result = cursor.fetchone()
            if result:
                return {"Valido": True, "IDMaestro": result["IDMaestro"]}
            else:
                return {"Valido": False, "IDMaestro": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/sesion/nivel")
async def sesion_nivel(
    IDAlumno: int = Form(...),
    NumNivel: int = Form(...),
    Aciertos: int = Form(...),
    Errores: int = Form(...),
    Tiempo: str = Form(...),
):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            # para la fecha, se va a usar la fecha actual del sistema
            fecha = datetime.now()
            cursor.execute(
                "INSERT INTO SesionNivel (IDAlumno, NumNivel, Aciertos, Errores, Tiempo, Fecha) VALUES (%s, %s, %s, %s, %s, %s)",
                (
                    IDAlumno,
                    NumNivel,
                    Aciertos,
                    Errores,
                    Tiempo,
                    fecha,
                ),
            )
            connection.commit()
            return {"Insertado": True}
    except Exception as e:
        print("Error: ", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/top/grupo")
async def top_grupo(grupo: str):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT SesionNivel.IDAlumno, SesionNivel.Aciertos, SesionNivel.Tiempo FROM SesionNivel
                JOIN Alumno ON SesionNivel.IDAlumno = Alumno.IDAlumno
                WHERE Alumno.Grupo = %s ORDER BY Aciertos DESC, Tiempo ASC LIMIT 5""",
                (grupo),
            )
            result = cursor.fetchall()
            if result:
                return result
            else:
                return {"message": "No hay registros"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/top/grupo/mujeres")
async def top_grupo_mujeres(grupo: str):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT SesionNivel.IDAlumno, SesionNivel.Aciertos, SesionNivel.Tiempo FROM SesionNivel
                JOIN Alumno ON SesionNivel.IDAlumno = Alumno.IDAlumno
                WHERE Alumno.Grupo = %s AND Genero = 'M' ORDER BY Aciertos DESC, Tiempo ASC LIMIT 5""",
                (grupo),
            )
            result = cursor.fetchall()
            if result:
                return result
            else:
                return {"message": "No hay registros"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/top/grupo/hombres")
async def top_grupo_hombres(grupo: str):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                """SELECT SesionNivel.IDAlumno, SesionNivel.Aciertos, SesionNivel.Tiempo FROM SesionNivel
                JOIN Alumno ON SesionNivel.IDAlumno = Alumno.IDAlumno
                WHERE Alumno.Grupo = %s AND Genero = 'H' ORDER BY Aciertos DESC, Tiempo ASC LIMIT 5""",
                (grupo),
            )
            result = cursor.fetchall()
            if result:
                return result
            else:
                return {"message": "No hay registros"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/nivel/{num_nivel}")
async def obtener_nivel(num_nivel: int):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT NumNivel, NumPreguntas, Descripcion FROM Nivel WHERE NumNivel = %s",
                (num_nivel,),
            )
            result = cursor.fetchone()
            if result:
                return {
                    "NumNivel": result["NumNivel"],
                    "NumPreguntas": result["NumPreguntas"],
                    "Descripcion": result["Descripcion"],
                }
            else:
                return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/pregunta/nivel1")
async def obtener_pregunta_nivel1():
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT Texto, Respuesta FROM Pregunta WHERE NumNivel = 1 ORDER BY RAND() LIMIT 3",
            )
            result = cursor.fetchall()
            if result:
                return {"questions": result}
            else:
                return {"questions": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/preguntas_completas/nivel1")
async def obtener_pregunta_nivel1():
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT Texto, Respuesta FROM Pregunta WHERE NumNivel = 1",
            )
            result = cursor.fetchall()
            if result:
                return {"questions": result}
            else:
                return {"questions": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/alumno/ultimasesion")
async def obtener_ultima_sesion(IDAlumno: int = Form(...),):
    # Regresa el ultimo nivel en el que el alumno se queda
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            query = "SELECT NumNivel FROM SesionNivel WHERE IDAlumno = %s ORDER BY Fecha DESC LIMIT 1;"
            cursor.execute(query, (IDAlumno,))
            result = cursor.fetchone()
            if result:
                return {"level": result["NumNivel"]}
            else:
                return {"level": 0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/alumno/puntuaciones/{NumNivel}")
async def obtener_puntuaciones(IDAlumno: int, NumNivel: int):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            query = "SELECT Aciertos, Errores FROM SesionNivel WHERE IDAlumno = %s AND NumNivel = %s ORDER BY Fecha DESC LIMIT 1;"
            cursor.execute(query, (IDAlumno, NumNivel,))
            result = cursor.fetchone()
            if result:
                return {"puntuaciones": {"Aciertos": result["Aciertos"], "Errores": result["Errores"]}}
            else:
                return {"puntuaciones": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/alumno/tiempos/{NumNivel}")
async def obtener_tiempos(IDAlumno: int, NumNivel: int):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            query = "SELECT Tiempo FROM SesionNivel WHERE IDAlumno = %s AND NumNivel = %s ORDER BY Fecha DESC LIMIT 1;"
            cursor.execute(query, (IDAlumno, NumNivel,))
            result = cursor.fetchone()
            if result:
                return {"tiempos": result["Tiempo"]}
            else:
                return {"tiempos": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/info_alumnos/{IDMaestro}")
async def obtener_info_alumnos(IDMaestro: int):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            query = "SELECT IDAlumno, NumLista, Genero, Grupo FROM Alumno WHERE IDMaestro = %s;"
            cursor.execute(query, (IDMaestro,))
            result = cursor.fetchall()
            if result:
                return result
            else:
                return {"message": "No hay registros"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@app.delete("/delete_alumno/{IDAlumno}")
async def eliminar_alumno(IDAlumno: int):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Alumno WHERE IDAlumno = %s", (IDAlumno,))
            connection.commit()
            return {"message": "Alumno eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/alumno/agregar")
async def agregar_alumno(
    Genero: str = Form(...),
    Grupo: str = Form(...),
    NumLista: int = Form(...),
):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO Alumno ( Genero, Grupo, NumLista) VALUES (%s, %s, %s, %s)",
                (Genero, Grupo, NumLista),
            )
            connection.commit()
            return {"message": "Alumno agregado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#crud completo de preguntas
@app.post("/pregunta/agregar")
async def agregar_pregunta(
    Texto: str = Form(...),
    Respuesta: str = Form(...),
    NumNivel: int = Form(...),
):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO Pregunta (Texto, Respuesta, NumNivel) VALUES (%s, %s, %s)",
                (Texto, Respuesta, NumNivel),
            )
            connection.commit()
            return {"message": "Pregunta agregada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.delete("/borrar_pregunta/{IDPregunta}")
async def eliminar_pregunta(IDPregunta: int):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Pregunta WHERE IDPregunta = %s", (IDPregunta,))
            connection.commit()
            return {"message": "Pregunta eliminada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/actualizar_pregunta/{IDPregunta}")
async def actualizar_pregunta(
    IDPregunta: int,
    Texto: str = Form(...),
    Respuesta: str = Form(...),
):
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE Pregunta SET Texto = %s, Respuesta = %s WHERE IDPregunta = %s",
                (Texto, Respuesta, IDPregunta),
            )
            connection.commit()
            return {"message": "Pregunta actualizada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

if __name__ == ("__main__"):
    uvicorn.run("BackEnd:app", host="0.0.0.0", port=8000, reload=True)
