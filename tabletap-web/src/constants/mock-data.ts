export const mockDashboardStats = {
  revenue: 12500000,
  guests: 45,
  orders: 32,
  activeTables: 8,
};

export const mockRevenueData = [
  { date: "01/12/2025", revenue: 15000000 },
  { date: "02/12/2025", revenue: 12000000 },
  { date: "03/12/2025", revenue: 8000000 },
  { date: "04/12/2025", revenue: 8000000 },
  { date: "05/12/2025", revenue: 10000000 },
  { date: "06/12/2025", revenue: 14000000 },
  { date: "07/12/2025", revenue: 18000000 },
];

export const mockDishRanking = [
  {
    id: "dish-1",
    name: "Tôm Hùm Bông",
    orders: 120,
    image: "/images/tom-hum-bong.jpg",
    description: "Tôm hùm bông nướng phô mai",
  },
  {
    id: "dish-2",
    name: "Cua Hoàng Đế",
    orders: 95,
    image: "/images/cua-hoang-de.jpg",
    description: "Cua hoàng đế hấp sả",
  },
  {
    id: "dish-3",
    name: "Mực Một Nắng",
    orders: 85,
    image: "/images/muc-mot-nang.jpg",
    description: "Mực một nắng nướng muối ớt",
  },
  {
    id: "dish-4",
    name: "Hàu Sữa",
    orders: 70,
    image: "/images/hau-sua.jpg",
    description: "Hàu sữa nướng mỡ hành",
  },
  {
    id: "dish-5",
    name: "Cá Mú Đỏ",
    orders: 60,
    image: "/images/ca-mu-do.jpg",
    description: "Cá mú đỏ hấp xì dầu",
  },
];

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "order" | "reservation" | "system";
}

export const mockNotifications: MockNotification[] = [
  {
    id: "notif-1",
    title: "Đơn hàng mới",
    message: "Bàn 12 vừa đặt thêm 2 món Cua Hoàng Đế",
    timestamp: "2 phút trước",
    read: false,
    type: "order",
  },
  {
    id: "notif-2",
    title: "Đặt bàn mới",
    message: "Khách Nguyễn Văn Hùng đặt bàn 4 người lúc 19:00 ngày mai",
    timestamp: "15 phút trước",
    read: false,
    type: "reservation",
  },
  {
    id: "notif-3",
    title: "Đơn đã thanh toán",
    message: "Bàn 8 đã thanh toán 2.450.000đ",
    timestamp: "1 giờ trước",
    read: true,
    type: "order",
  },
  {
    id: "notif-4",
    title: "Cập nhật hệ thống",
    message: "Phiên bản 1.2.0 đã sẵn sàng với cải tiến báo cáo doanh thu",
    timestamp: "3 giờ trước",
    read: true,
    type: "system",
  },
  {
    id: "notif-5",
    title: "Hủy đặt bàn",
    message: "Đặt bàn bàn 6 lúc 18:30 đã được hủy bởi khách",
    timestamp: "5 giờ trước",
    read: true,
    type: "reservation",
  },
];
