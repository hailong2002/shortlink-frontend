import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://shortlink.io.vn",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// // Thêm đoạn này vào dưới file axiosClient.js
// axiosClient.interceptors.response.use(
//     (response) => {
//         return response; // Trả về bình thường nếu gọi API thành công (HTTP 2xx)
//     },
//     (error) => {
//         // Nếu BE trả về lỗi 401 (Chưa đăng nhập / Hết hạn token)
//         if (error.response && error.response.status === 401) {
//             console.log("Token hết hạn hoặc chưa đăng nhập. Đá ra ngoài!");

//             // Xóa state user hiện tại (nếu đang lưu ở localStorage phụ trợ nào đó)

//             // Điều hướng thẳng user về trang Login Google của Backend
//             window.location.href = 'https://shortlink.io.vn/oauth2/authorization/google';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosClient;