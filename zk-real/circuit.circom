pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template ThresholdCheck() {
    signal input score;
    signal input threshold;

    component gte = GreaterEqThan(32);

    
    gte.in[0] <== threshold;
    gte.in[1] <== score;

    gte.out === 1;
}

component main = ThresholdCheck();