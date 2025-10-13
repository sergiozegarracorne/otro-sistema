package controllers

import (
	"fmt"
	"go-login/models"
	"go-login/utils" // <-- Importamos nuestro paquete de utilidades
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// CSRFTokenHandler genera y entrega un token CSRF (versión Gin)
func CSRFTokenHandler(c *gin.Context) {
	token, err := utils.GenerateSecureToken(32)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al generar el token"})
		return
	}
	// Gin también nos facilita poner las cookies
	c.SetCookie("csrf_token", token, 3600, "/", "", false, true) // (name, value, maxage, path, domain, secure, httponly)
	// Y devolver el JSON es mucho más sencillo
	c.JSON(http.StatusOK, gin.H{"token": token})
}

// LoginRequest se queda igual
type LoginRequest struct {
	RUC       string `json:"ruc" binding:"required"`
	Usuario   string `json:"usuario" binding:"required"`
	Password  string `json:"password" binding:"required"`
	CSRFToken string `json:"csrf_token" binding:"required"`
}

// LoginHandler maneja la lógica del login (versión Gin)
func LoginHandler(c *gin.Context) {
	// 1. VERIFICACIÓN DEL TOKEN CSRF
	cookieToken, err := c.Cookie("csrf_token")
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "Token CSRF no encontrado"})
		return
	}

	var req LoginRequest
	// Gin puede bindear el JSON directamente a nuestra struct y validar los campos "required"
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos o incompletos"})
		return
	}

	if req.CSRFToken != cookieToken {
		c.JSON(http.StatusForbidden, gin.H{"error": "Token CSRF inválido"})
		return
	}

	// 2. Buscamos al usuario
	user, passwordHash, err := models.GetUserByCredentials(req.RUC, req.Usuario)
	fmt.Println(user)
	if err != nil {
		// Gin nos da un helper para saber si es un error de "no se encontraron filas"
		// si no, asumimos que es un error genérico.
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Credenciales incorrectas"})
		return
	}

	// 3. Comparamos la contraseña
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Credenciales incorrectas"})
		return
	}

	// 4. Respuesta de éxito
	fakeToken := "token-secreto-de-acceso-12345"
	response := models.LoginResponse{
		Token:   fakeToken,
		Message: "Login exitoso",
	}
	c.JSON(http.StatusOK, response)
}

// POST /login
func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	user, hash, err := models.GetUserByCredentials(input.Email, "")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario o contraseña incorrectos"})
		return
	}

	// Verificar contraseña
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario o contraseña incorrectos"})
		return
	}

	// Crear token de sesión
	token := uuid.New().String()
	expires := time.Now().Add(2 * time.Hour) // duración 2h
	err = models.CreateSession(user.ID, token, expires)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear la sesión"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}

// GET /holaMundo
func HolaMundo(c *gin.Context) {
	// Texto que quieres hashear (por ejemplo "123456")
	password := "123456"

	// Generar hash bcrypt
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "No se pudo generar el hash"})
		return
	}

	fmt.Println("🔐 Hash generado:", string(hash))

	// Devolver JSON con hash y mensaje
	c.JSON(200, gin.H{
		"mensaje": "Hola Mundo desde Go + Gin",
		"hash":    string(hash),
		"time":    time.Now().Format("2006-01-02 15:04:05"),
	})
}

// GET /me  → verificar sesión y devolver info
func Me(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token requerido"})
		return
	}

	userID, valid := models.ValidateSession(token)
	if !valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesión no válida o expirada"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sesión válida", "user_id": userID})
}

// POST /logout
func Logout(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token requerido"})
		return
	}

	err := models.DeleteSession(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo cerrar sesión"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sesión cerrada"})
}
