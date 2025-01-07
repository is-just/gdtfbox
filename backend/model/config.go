package model

type Config struct {
	Type  string `json:"type" gorm:"unique"`
	Value string `json:"value"`
}
