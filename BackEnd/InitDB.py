import pymysql
from pymysql.cursors import DictCursor

# Conexión a la base de datos
connection = pymysql.connect(
    host="localhost", user="team1", password="team1", cursorclass=DictCursor
)

try:
    with connection.cursor() as cursor:
        # crea la base de datos leyendo el script SQL
        with open("SetUp.sql", "r") as file:
            sql_script = file.read()

        for statement in sql_script.split(";"):
            cursor.execute(statement)

    connection.commit()
    print("Base de datos y tablas creadas correctamente.")

except Exception as e:
    print("Error en la ejecución del script SQL:", e)
