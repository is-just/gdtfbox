package entity

type GdtfFixture struct {
	Rid          int               `json:"rid"`
	Fixture      string            `json:"fixture"`
	Revision     string            `json:"Revision"`
	CreationDate string            `json:"creationDate"`
	LastModified string            `json:"lastModified"`
	Uploader     string            `json:"uploader"`
	Rating       float64           `json:"rating"`
	Version      string            `json:"version"`
	Creator      string            `json:"creator"`
	Uuid         string            `json:"uuid"`
	Filesize     string            `json:"filesize"`
	Modes        []GdtfFixtureMode `json:"modes"`
}

type GdtfFixtureMode struct {
	Name         string `json:"string"`
	DmxFootprint int    `json:"dmxfootprint"`
}
