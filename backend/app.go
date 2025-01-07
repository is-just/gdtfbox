package backend

import (
	"context"
	"fmt"
	"gdtfbox/backend/entity"
	"net/http"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx        context.Context
	authCookie http.Cookie
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	runtime.EventsEmit(a.ctx, "notification", &entity.Notification{Value: "Test"})
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
	return false
}

func (a *App) SaveCredentials(user string, password string) bool {
	fmt.Println("SaveCredentials", user, password)
	return false
}
