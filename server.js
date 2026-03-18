const express = require("express");
const { generateProof } = require("./zk-service");
const { execSync } = require("child_process");
const path = require("path");

const app = express();

// Servir frontend
app.use(express.static("public"));

// 🔵 GENERAR PROOF
app.get("/prove", (req, res) => {
  try {
    const { score, threshold } = req.query;

    if (!score || !threshold) {
      return res.status(400).send("Faltan parámetros: score y threshold");
    }

    generateProof(score, threshold);

    res.send(`✅ Proof generada para score=${score} y threshold=${threshold}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error generando proof");
  }
});

// 🟢 VERIFICAR PROOF
app.get("/verify", (req, res) => {
  try {
    const verificationKeyPath = path.join(
      __dirname,
      "zk-real",
      "build",
      "verification_key.json"
    );

    const publicPath = path.join(__dirname, "zk-real", "build", "public.json");
    const proofPath = path.join(__dirname, "zk-real", "build", "proof.json");

    const output = execSync(
      `snarkjs groth16 verify "${verificationKeyPath}" "${publicPath}" "${proofPath}"`,
      { encoding: "utf8" }
    );

    res.json({
      success: true,
      result: output,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor en http://localhost:3000");
});