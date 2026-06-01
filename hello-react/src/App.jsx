// 1. Nhập khẩu (Import) các mảnh lego từ các file bên ngoài vào
import Header from "./Header";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

function App() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            {/* Thả mảnh ghép Header vào đây */}
            <Header />

            <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{ color: "#333" }}>Sản phẩm mới đăng gần đây</h2>
                
                {/* Khu vực chứa danh sách sản phẩm */}
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "15px" }}>
                    {/* Tái sử dụng linh hoạt Component ProductCard 4 lần! */}
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </main>

            {/* Thả mảnh ghép Footer vào cuối */}
            <Footer />
        </div>
    );
}

export default App;