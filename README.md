<!-- category route -->
<!-- create category done (ADMIN) -->
<!-- get category done (ALL) -->

<!--  -->
<!-- medicine api -->
<!-- create medicine done (SELLER) -->

http://localhost:5000/api/v1/medicines

<!-- get medicine done (ALL) -->

http://localhost:5000/api/v1/medicines

<!-- get specifice medicine  -->

http://localhost:5000/api/v1/medicine/:medincineID
http://localhost:5000/api/v1/medicine/452c0cca-8cfa-495f-aca8-7b0cdfaa897d

<!-- medicne put by id -->

http://localhost:5000/api/v1/medicine/:medincineID
http://localhost:5000/api/v1/medicine/452c0cca-8cfa-495f-aca8-7b0cdfaa897d

<!-- medicne delete by id -->

http://localhost:5000/api/v1/medicine/:medincineID
http://localhost:5000/api/v1/medicines/451316f5-f7ca-4aa8-9fad-50d3797dd230

<!--  -->
<!-- Admin -->
<!-- get all user -->

http://localhost:5000/api/v1/users

<!-- update user status -->

http://localhost:5000/api/v1/users/5VU58OkuA0hBJGrNl9JwEmoJYXfNb9St

<!--  -->
<!-- order api -->
<!-- create order post (customer) -->

http://localhost:5000/api/v1/orders

<!-- user own orders and seller, admin get all orders -->

http://localhost:5000/api/v1/orders

<!-- customer can see only one details -->

http://localhost:5000/api/v1/orders/21e7d004-b1cc-4489-bc81-0bd8dbefb200

<!--  -->
<!-- Reviews -->

<!-- only customer can reviews -->

http://localhost:5000/api/v1/reviews

<!--  -->

## git clone https://github.com/hisuvo/medi-server.git

## pnpm i

## pnpm dlx prisma migrate dev --name init

## pnpm dlx prisma generate
