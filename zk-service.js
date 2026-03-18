const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function generateProof(score, threshold) {
  try {
    const inputPath = path.join(__dirname, "zk-real", "input.json");
    const witnessPath = path.join(__dirname, "zk-real", "build", "witness.wtns");
    const proofPath = path.join(__dirname, "zk-real", "build", "proof.json");
    const publicPath = path.join(__dirname, "zk-real", "build", "public.json");

    const generateWitnessJs = path.join(
      __dirname,
      "zk-real",
      "build",
      "circuit_js",
      "generate_witness.js"
    );

    const wasmPath = path.join(
      __dirname,
      "zk-real",
      "build",
      "circuit_js",
      "circuit.wasm"
    );

    const zkeyPath = path.join(
      __dirname,
      "zk-real",
      "build",
      "circuit_final.zkey"
    );

    const inputData = {
      score: String(score),
      threshold: String(threshold),
    };

    fs.writeFileSync(inputPath, JSON.stringify(inputData, null, 2));

    execSync(
      `node "${generateWitnessJs}" "${wasmPath}" "${inputPath}" "${witnessPath}"`,
      { stdio: "inherit" }
    );

    execSync(
      `snarkjs groth16 prove "${zkeyPath}" "${witnessPath}" "${proofPath}" "${publicPath}"`,
      { stdio: "inherit" }
    );

    const proof = JSON.parse(fs.readFileSync(proofPath, "utf8"));
    const publicSignals = JSON.parse(fs.readFileSync(publicPath, "utf8"));

    return {
      success: true,
      proof,
      publicSignals,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = { generateProof };