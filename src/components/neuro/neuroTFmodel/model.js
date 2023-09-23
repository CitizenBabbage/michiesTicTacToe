import * as tf from '@tensorflow/tfjs';

// Function to create a neural network model
export function createModel(hiddenLayers) {
    // Validate the parameter
    if (!Array.isArray(hiddenLayers) || hiddenLayers.length === 0) {
        throw new Error("You must provide an array of integers representing sizes of hidden layers.");
    }

    // Create the sequential model
    const model = tf.sequential();

    // Input layer
    model.add(tf.layers.dense({
        units: hiddenLayers[0],
        activation: 'relu',
        inputShape: [27]
    }));

    // Hidden layers
    for (let i = 1; i < hiddenLayers.length; i++) {
        model.add(tf.layers.dense({
            units: hiddenLayers[i],
            activation: 'relu'
        }));
    }

    // Output layer
    model.add(tf.layers.dense({ units: 36 }));              // 36 output units no activation function
    model.add(tf.layers.reshape({ targetShape: [9, 4] }));  // transform into 9 groups of 4
    // model.add(tf.layers.softmax());
    model.add(tf.layers.softmax({ axis: 2 }));

    // model.add(tf.layers.flatten());                         //flatten the outputs for post-processing


    // Compile the model
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}

class SoftmaxLastDim extends tf.layers.Layer {
    constructor(config) {
      super(config);
    }
  
    call(inputs) {
      return tf.softmax(inputs[0], -1);
    }
  
    computeOutputShape(inputShape) {
      return inputShape;
    }
  
    // The static className method
    static get className() {
      return 'SoftmaxLastDim';
    }
    
    // Additional method for deserialization
    static fromConfig(cls, config) {
      return new cls(config);
    }
  }
  
  tf.serialization.registerClass(SoftmaxLastDim);