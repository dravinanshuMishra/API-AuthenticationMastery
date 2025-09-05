import app from "./src/app";

const port = process.env.PORT || 8080;

// server start.
const serverStart = () => {
    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    });
}

serverStart();