import Express from "express";

const app = Express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Everything is okay");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
