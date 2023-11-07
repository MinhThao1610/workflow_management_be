Các yêu cầu trước khi chạy project:
- Node: >= 16
- Docker

Khi chạy project:
- Khởi tạo docker image: run terminal: docker-compose up
- Khởi tạo các table với prima: npx prisma migrate dev
- Như vậy table đã được khởi tạo thành công.
- Updata table data bằng npx prisma db push.

Chạy server:
- 