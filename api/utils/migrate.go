package utils

import (
	"go-login/config"
	"io/ioutil"
	"log"
	"path/filepath"
)

// RunMigrations ejecuta las migraciones de la base de datos
func RunMigrations() {
	// Crear tabla de sesiones
	createSessionsTable := `
	CREATE TABLE IF NOT EXISTS 2025_sessions (
		id INT AUTO_INCREMENT PRIMARY KEY,
		user_id INT NOT NULL,
		token VARCHAR(255) NOT NULL UNIQUE,
		expires_at DATETIME NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		INDEX idx_token (token),
		INDEX idx_user_id (user_id),
		INDEX idx_expires_at (expires_at)
	)`

	_, err := config.DB.Exec(createSessionsTable)
	if err != nil {
		log.Printf("Error creando tabla 2025_sessions: %v", err)
	} else {
		log.Println("✅ Tabla 2025_sessions creada/verificada correctamente")
	}
}

// LoadMigrationFromFile carga y ejecuta una migración desde un archivo
func LoadMigrationFromFile(filename string) error {
	filePath := filepath.Join("migrations", filename)
	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}

	_, err = config.DB.Exec(string(content))
	return err
}
