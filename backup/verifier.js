const { ethers } = require("hardhat");

async function main() {
  // 🔹 Dirección del contrato (IMPORTANTE)
  const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  // 🔹 Obtener contrato
  const Verifier = await ethers.getContractFactory("Verifier");
  const contract = Verifier.attach(CONTRACT_ADDRESS);

  console.log("✅ Contrato cargado");

  // 🔹 DATOS DE TU PROOF (los que generaste)
  const pA = [
    "0x14bce5e0cbfe2b8f6e2305c0cd18322909f6fde23eba2b7085a0f26a97167321",
    "0x1aa523f5382f4e2a131e57791cbbfbdddb9c05d2662cb9a5837cad4d0b4b72b6"
  ];

  const pB = [
    [
      "0x28823ff73ce79b263dfab75626100d34f91ee0abda3e654a652c5136fda4cf10",
      "0x06be88e3ee1f100c3f830a85c72f5266bd0dd9adf612f531c10841cd78f36109"
    ],
    [
      "0x0a6365100fd5385d6f04fa75534ce13764f6dda77bd59a89f05c8376ae61a6fc",
      "0x241b76ddb977441a2a3eac5090977744db5af6333c6a566eacfa42bde3990d3a"
    ]
  ];

  const pC = [
    "0x0a53f313c1e2d37d15d836b29c6d0f3b6447d9b55ca0f02dce2f4cb11582e429",
    "0x0080d2c65fa51f2eea3c4c931584bac3d687f75e751ed8d4e14be4f19ebedbd7"
  ];

  const pubSignals = [
    "0x00000000000000000000000000000000000000000000000000000000000002ee"
  ];

  // 🔹 LLAMADA REAL AL CONTRATO
  const result = await contract.verifyProof(pA, pB, pC, pubSignals);

  console.log("🧪 Resultado on-chain:", result);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});