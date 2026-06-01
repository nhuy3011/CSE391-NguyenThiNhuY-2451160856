function Header() {
    return (
        <header style={{ 
            background: "#007bff", 
            color: "white", 
            padding: "15px 20px", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <h1 style={{ margin: 0, fontSize: "20px" }}>🏫 CampusSwap - TLU</h1>
            <nav>
                <a href="#" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Trang chủ</a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Quản lý tin đăng</a>
            </nav>
        </header>
    );
}
export default Header; // Bắt buộc phải export để file khác gọi được nó