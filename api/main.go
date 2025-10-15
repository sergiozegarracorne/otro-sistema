package main

import (
	"go-login/config"
	"go-login/routes"
)

func main() {
	config.ConnectDB()

	// Ejecutar migraciones
	//utils.RunMigrations()

	r := routes.SetupRouter()
	r.Run(":9000")
}
