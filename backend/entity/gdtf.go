package entity

type GdtfLoginRequest struct {
	User     string `json:"user"`
	Password string `json:"password"`
}

type GdtfLoginResponse struct {
	Result bool   `json:"result"`
	Notice string `json:"notice"`
	Error  string `json:"error"`
}

type GdtfGetListResponse struct {
	Result    bool          `json:"result"`
	Timestamp string        `json:"timestamp"`
	List      []GdtfFixture `json:"list"`
	Error     string        `json:"error"`
}

type GdtfFileDownloadRequest struct {
	Rid int `json:"rid"`
}

type GdtfFileDownloadResponse struct {
	Result bool   `json:"result"`
	Error  string `json:"error"`
}
