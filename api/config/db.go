package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func ConnectDB() {

	err := godotenv.Load()
	if err != nil {
		log.Println("No se encontró archivo .env, usando variables de entorno del sistema")
	}

	// Usamos os.Getenv("NOMBRE_DE_LA_VARIABLE") para obtener el valor
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", dbUser, dbPassword, dbHost, dbPort, dbName)

	//dsn := "go:123456@tcp(1.2.1.42:3306)/go?parseTime=true"
	var errDB error
	DB, errDB = sql.Open("mysql", dsn)
	if errDB != nil {
		log.Fatal("❌ Error al abrir conexión:", errDB)
	}

	errDB = DB.Ping()
	if errDB != nil {
		log.Fatal("❌ Error al conectar a MySQL:", errDB)
	}

	fmt.Println("✅ Conectado a MySQL correctamente")
}
