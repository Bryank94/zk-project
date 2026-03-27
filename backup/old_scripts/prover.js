const crypto = require("crypto");

function hashValue(value) {
  return crypto
    .createHash("sha256")
    .update(value.toString())
    .digest("hex");
}

function generateProof(score, threshold) {
  const commitment = hashValue(score);

  const isValid = score >= threshold;

  return {
    commitment,        // hash del score
    threshold,         // público
    result: isValid    // afirmación del prover
  };
}

module.exports = { generateProof };