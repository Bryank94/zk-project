function generateProof(score, threshold) {
  const valid = score >= threshold;

  return {
    proof: valid,
    statement: "El score es mayor o igual que el threshold"
  };
}

module.exports = { generateProof };