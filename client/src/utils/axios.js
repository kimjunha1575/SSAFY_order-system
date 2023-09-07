import axios from 'axios';

const DOMAIN = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: `${DOMAIN}/api`,
});

export const api = {
  // menu
  menus: {
    findAll: () => request.get('/menus'),
    findOne: (id) => request.get(`/menus/${id}`),
    create: (name, description, file) => {
      // 파일 전송은 formData로 묶어서 보낸다
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);
      return request.post('/menus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    update: (id, name, description) =>
      request.patch(`/menus/${id}`, {
        name: name,
        description: description,
      }),
    updateImage: (id, file) => {
      const formData = new FormData();
      formData.append('file', file);
      return request.post(`/menus/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    delete: (id) => request.delete(`/menus/${id}`),
  },
  // order
  orders: {
    findAll: () => request.get('/orders'),
    findOne: (id) => request.get(`/orders/${id}`),
    create: (quantity, request_detail, menus_id) =>
      request.post('/orders', {
        quantity: quantity,
        request_detail: request_detail,
        menus_id: menus_id,
      }),
    update: (id, quantity, request_detail, menus_id) =>
      request.patch(`/orders/${id}`, {
        quantity: quantity,
        request_detail: request_detail,
        menus_id: menus_id,
        id: id
      }),
    delete: (id) => request.delete(`/orders/${id}`),
  },
};

// 메뉴 전체 조회
// /admin/menus
// 메뉴 등록
// /admin/menus/register

// vue router: 전부 GET

// 메뉴 수정
// /admin/menus/register/:id
// /admin/menus/:id
