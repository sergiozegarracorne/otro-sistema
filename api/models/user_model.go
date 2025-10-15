// models/user.go
package models

import (
	"go-login/config"
)

// User representa la estructura de un usuario.
// Los campos que empiezan con mayúscula son públicos (exportados).
type User struct {
	ID      int    `json:"id"`      // ID del usuario
	RUC     string `json:"ruc"`     // RUC de la empresa
	Usuario string `json:"usuario"` // Nombre de usuario
	Correo  string `json:"correo"`  // Correo electrónico
	Nivel   int    `json:"nivel"`   // Nivel de acceso
	// Nota: El campo Password NO va aquí para no enviarlo accidentalmente al frontend.
}

// LoginResponse es la estructura de la respuesta que enviaremos al frontend
type LoginResponse struct {
	Token   string `json:"token"`
	Message string `json:"message"`
}

// GetUserByCredentials busca un usuario por su RUC y nombre de usuario.
// Devuelve el usuario encontrado y su hash de contraseña.
func GetUserByCredentials(ruc string, usuario string) (User, string, error) {
	var u User
	var passwordHash string

	// 1. La consulta SQL solo busca por RUC y Usuario. NUNCA por contraseña.
	// 2. Las columnas que seleccionamos (id, ruc, usu, cor, niv, password)
	//    coinciden EXACTAMENTE con el orden y tipo de las variables en el Scan.
	query := "SELECT idx, ruc, usu, cor, niv, paz FROM tbl_user_2025 WHERE ruc = ? AND usu = ?"

	err := config.DB.QueryRow(query, ruc, usuario).Scan(
		&u.ID,         // Mapea columna 'id' a u.ID
		&u.RUC,        // Mapea columna 'ruc' a u.RUC
		&u.Usuario,    // Mapea columna 'usu' a u.Usuario
		&u.Correo,     // Mapea columna 'cor' a u.Correo
		&u.Nivel,      // Mapea columna 'niv' a u.Nivel
		&passwordHash, // Mapea columna 'password' a la variable passwordHash
	)

	// Si hay un error (ej. no se encontró el usuario), lo devuelve tal cual.
	// Si todo va bien, devuelve el usuario, su hash y un error 'nil'.
	return u, passwordHash, err
}
