package entity

type GdtfFixture struct {
	Rid          int               `json:"rid"`
	Fixture      string            `json:"fixture"`
	Manufacturer string            `json:"manufacturer"`
	Revision     string            `json:"Revision"`
	CreationDate int               `json:"creationDate"`
	LastModified int               `json:"lastModified"`
	Uploader     string            `json:"uploader"`
	Rating       string            `json:"rating"`
	Version      string            `json:"version"`
	Creator      string            `json:"creator"`
	Uuid         string            `json:"uuid"`
	Filesize     int               `json:"filesize"`
	Modes        []GdtfFixtureMode `json:"modes"`
}

type GdtfFixtureMode struct {
	Name         string `json:"string"`
	DmxFootprint int    `json:"dmxfootprint"`
}
