import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag";

function App() {
    // Mảng dữ liệu cho thử nghiệm 3 chiếc UserCard khác nhau
    const users = [
        { id: 1, name: "Nguyễn Văn Minh", email: "minh.nv@tlu.edu.vn", avatar: "https://i.pravatar.cc/150?img=33" },
        { id: 2, name: "Trần Thị An", email: "an.tt@tlu.edu.vn", avatar: "https://i.pravatar.cc/150?img=47" },
        { id: 3, name: "Lê Hoàng Linh", email: "linh.lh@tlu.edu.vn", avatar: "https://i.pravatar.cc/150?img=12" }
    ];

    return (
        <div style={{ padding: "30px", backgroundColor: "#f5f7fa", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
            
            {/* =========================================================
                THỬ NGHIỆM 1 & 3: Hiển thị 3 danh sách UserCard khác nhau
                ========================================================= */}
            <h2 style={{ color: "#2c3e50" }}>👥 Thành viên hệ thống</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "4px" }}>
                {users.map(user => (
                    <UserCard 
                        key={user.id}
                        name={user.name}     // Truyền chuỗi chữ (String)
                        email={user.email}   // Truyền chuỗi chữ (String)
                        avatar={user.avatar} // Truyền chuỗi chữ (String)
                    />
                ))}
            </div>

            <hr style={{ margin: "40px 0", border: "0", borderTop: "1px solid #ddd" }} />

            {/* =========================================================
                THỬ NGHIỆM 2: Hiển thị PriceTag với các kiểu số khác nhau
                ========================================================= */}
            <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>🏷️ Thử nghiệm nhãn giá (PriceTag)</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666" }}>Sản phẩm có giảm giá:</p>
                    {/* Cách truyền dữ liệu kiểu Số (Number) bắt buộc phải bọc trong dấu ngoặc nhọn {} */}
                    <PriceTag originalPrice={25000000} salePrice={21990000} />
                </div>

                <div>
                    <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666" }}>Sản phẩm bán đúng giá gốc (Không giảm):</p>
                    <PriceTag originalPrice={500000} salePrice={500000} />
                </div>
            </div>

        </div>
    );
}

export default App;