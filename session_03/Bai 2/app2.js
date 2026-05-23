// LẤY CÁC PHẦN TỬ DOM CƠ BẢN
const vungDanhSachCv = document.getElementById('vung-danh-sach-cv');
const lblTong = document.getElementById('tong-cv');
const lblXong = document.getElementById('cv-xong');
const lblChuaXong = document.getElementById('cv-chua-xong');

// LUỒNG A: Đọc dữ liệu từ localStorage, nếu không có thì tạo mảng rỗng
let danhSachTask = JSON.parse(localStorage.getItem('data_congviec')) || [];

// LUỒNG A: Thống kê trạng thái trống ban đầu
function updateTaskSummary() {
    lblTong.innerText = danhSachTask.length;
    lblXong.innerText = "0";
    lblChuaXong.innerText = "0";
}

// LUỒNG A: Render dữ liệu mảng ra màn hình dưới dạng Card
function renderTasks() {
    vungDanhSachCv.innerHTML = ""; // Xóa sạch giao diện cũ

    // Nếu mảng chưa có dữ liệu, hiển thị trạng thái rỗng
    if (danhSachTask.length === 0) {
        vungDanhSachCv.innerHTML = `<p style="color:gray; text-align:center;">Danh sách công việc trống.</p>`;
        return;
    }

    // Duyệt mảng để tạo các thẻ div card công việc
    danhSachTask.forEach(function(task, index) {
        const card = document.createElement('div');
        card.className = "card-cong-viec";

        card.innerHTML = `
            <h4>
                <input type="checkbox">
                ${task.tieuDe} [Mức: ${task.uuTien}]
            </h4>
            <p>Mô tả: ${task.moTa}</p>
            <p>Hạn chót: <strong>${task.hanChot}</strong></p>
            <button>Sửa</button>
            <button>Xóa</button>
        `;
        vungDanhSachCv.appendChild(card);
    });
}

// KHỞI CHẠY KHI MỞ TRANG
renderTasks();
updateTaskSummary();