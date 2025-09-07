# stepUp instructions.

```javascript

1. npm init → project ke liye ek package.json file banata hai jisme project ki details aur dependencies ka record hota hai.

2. npm install -D typescript → TypeScript compiler (tsc) ko project me dev dependency ke roop me install karta hai.

3. npm install -D nodemon → server/file changes ko auto-restart karne ke liye use hota hai.

4. npm install -D ts-node → .ts files ko bina compile kiye directly run karne ke liye use hota hai.

5. npm install -D @types/node → Node.js ke liye TypeScript type definitions deta hai, taaki autocompletion aur type-checking sahi se ho.

short: npm install -D typescript nodemon ts-node @types/node

1. npx tsc --init => for install typescript in this project.
2. npm init @eslint/config@latest => for eslint for best practice.


# Now install ExpressJS.
1. npm i express.
2. npm install -D @types/express => for type definitions.


#dotenv.
1. npm install dotenv
2. npm i -D @types/dotenv


#mongoose install for mongoDB Database.
1. npm i mongoose.
2. npm i -D @types/mongoose

# create formated errors for global error handling.
1. npm i http-errors
2. npm i -D @types/http-errors


## For inscription and decription password hased.
1. npm i bcrypt
2. npm i -D @types/bcrypt

# For Json Web Token.
1. npm i jsonwebtoken
2. npm i -D @types/jsonwebtoken

```


# Development (with nodemon + ts-node)
1. npm run dev

# Build for production
2. npm run build

# Run production build
3. npm start

