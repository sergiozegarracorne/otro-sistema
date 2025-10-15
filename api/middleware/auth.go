package middleware

import (
	"fmt"
	"go-login/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware verifica si el usuario está autenticado
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Obtener el token del header Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token de autorización requerido"})
			c.Abort()
			return
		}

		// 2. Extraer el token (formato: "Bearer token")
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Formato de token inválido"})
			c.Abort()
			return
		}

		token := tokenParts[1]

		// 3. Validar el token en la base de datos
		userID, isValid := models.ValidateSession(token)
		if !isValid {
			// Log para depuración
			fmt.Printf("🔍 [AUTH] Token inválido: %s\n", token)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})
			c.Abort()
			return
		}

		// Log para depuración
		fmt.Printf("✅ [AUTH] Token válido para usuario ID: %d\n", userID)

		// 4. Agregar información del usuario al contexto
		c.Set("user_id", userID)
		c.Set("token", token)

		// 5. Continuar con la siguiente función
		c.Next()
	}
}

// OptionalAuthMiddleware es como AuthMiddleware pero no bloquea si no hay token
func OptionalAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader != "" {
			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) == 2 && tokenParts[0] == "Bearer" {
				token := tokenParts[1]
				userID, isValid := models.ValidateSession(token)
				if isValid {
					c.Set("user_id", userID)
					c.Set("token", token)
				}
			}
		}
		c.Next()
	}
}
