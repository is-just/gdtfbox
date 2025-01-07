package backend

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"gdtfbox/backend/entity"
	"gdtfbox/backend/model"
	"net/http"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx         context.Context
	db          *gorm.DB
	authCookie  *http.Cookie
	authExpired time.Time
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	a.db = a.InitDatabase()

	runtime.EventsEmit(a.ctx, "notification", &entity.Notification{Value: "Test"})
}

func (a *App) InitDatabase() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("gdtfbox.db"), &gorm.Config{})

	db.AutoMigrate(
		&model.Config{},
	)

	return db
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	runtime.EventsEmit(a.ctx, "notification", &entity.Notification{Value: "Test"})
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SetNotification(value string) {
	runtime.EventsEmit(a.ctx, "notification", &entity.Notification{Value: value})
}

func (a *App) CheckAuth() bool {
	if a.authCookie != nil && time.Now().Before(a.authExpired) {
		return true
	}

	user := model.Config{}
	userErr := a.db.Model(&user).Where("type = ?", "user").First(&user).Error
	if userErr != nil {
		return false
	}

	password := model.Config{}
	passwordErr := a.db.Model(&password).Where("type = ?", "password").First(&password).Error
	if passwordErr != nil {
		return false
	}

	posturl := "https://gdtf-share.com/apis/public/login.php"

	jsonBody := []byte(`{"user": "` + user.Value + `", "password": "` + password.Value + `"}`)
	bodyReader := bytes.NewReader(jsonBody)

	r, err := http.NewRequest("POST", posturl, bodyReader)

	if err != nil {
		panic(err)
	}

	r.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		panic(err)
	}

	if len(res.Cookies()) > 0 {
		a.authCookie = res.Cookies()[0]
		a.authExpired = time.Now().Add(time.Duration(time.Duration(59).Minutes()))
	}

	defer res.Body.Close()

	signin := &entity.GdtfLoginResponse{}
	derr := json.NewDecoder(res.Body).Decode(signin)
	if derr != nil {
		panic(derr)
	}

	if !signin.Result {
		runtime.EventsEmit(a.ctx, "notification", &entity.Notification{Value: signin.Error})
	}

	return signin.Result
}

func (a *App) SaveCredentials(user string, password string) bool {

	// Username
	var userModel = model.Config{Type: "user", Value: user}

	if a.db.Model(&userModel).Where("type = ?", "user").Update("value", user).RowsAffected == 0 {
		a.db.Create(&userModel)
	}

	// Username
	var passwordModel = model.Config{Type: "password", Value: password}

	if a.db.Model(&passwordModel).Where("type = ?", "password").Update("value", password).RowsAffected == 0 {
		a.db.Create(&passwordModel)
	}

	return a.CheckAuth()
}
