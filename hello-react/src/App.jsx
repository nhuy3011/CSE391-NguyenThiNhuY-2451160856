// Triệu hồi toàn bộ các component từ thư mục con components/
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

function App() {
    // Mảng dữ liệu chứa thông tin các dòng điện thoại khác nhau
    const products = [
        { id: 1, name: "iPhone 15 Pro", price: "25.000.000", image: "https://picsum.photos/200/150?random=1" },
        { id: 2, name: "Samsung S24 Ultra", price: "22.000.000", image: "https://picsum.photos/200/150?random=2" },
        { id: 3, name: "Xiaomi 14 Ultra", price: "15.000.000", image: "https://picsum.photos/200/150?random=3" }
    ];

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            {/* Lắp ghép Header xịn */}
            <Header />

            <main style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Danh sách sản phẩm nổi bật</h2>
                
                {/* Khu vực rải thẻ Card */}
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} // Giúp React định vị phần tử (Học ở bài 2.3)
                            name={product.name}   // Truyền Props tên
                            price={product.price} // Truyền Props giá
                            image={product.image} // Truyền Props ảnh
                        />
                    ))}
                </div>
            </main>

            {/* Lắp ghép Footer xịn */}
            <Footer />
        </div>
    );
}

export default App;