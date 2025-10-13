// Puedes poner esto en un archivo nuevo como `utils/utils.go` o directamente en tu controlador.
package utils

import (
	"crypto/rand"
	"encoding/base64"
)

// GenerateSecureToken genera un token aleatorio y seguro
func GenerateSecureToken(length int) (string, error) {
	b := make([]byte, length)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}
