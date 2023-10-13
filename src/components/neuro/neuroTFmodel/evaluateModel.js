import * as tf from '@tensorflow/tfjs';
import { ohEncodeBoards } from './datafeeder.js';


export async function evaluateModel(model, valData, valLabels) {
    // Ensure data and labels are tensors
    console.log()
    const valY = tf.tensor(valLabels, [valLabels.length, 9, 4]);

    // const encodedData = ohEncodeBoards(valData); //oh means one-hot
    // const valX = tf.tensor2d(encodedData, [encodedData.length, 27]);
    const valX = tf.tensor2d(valData, [valData.length, 27]);

    // const valX = valData instanceof tf.Tensor ? valData : tf.tensor(valData);
    // const valY = valLabels instanceof tf.Tensor ? valLabels : tf.tensor(valLabels);

    const metrics = model.evaluate(valX, valY, {batchSize: 32});

    // If there is more than one metric, `metrics` will be an array
    console.log(`metrics is an array? `, Array.isArray(metrics))
    if (Array.isArray(metrics)) {`metrics length is `, metrics.length}
    let accuracy;
    if (Array.isArray(metrics)) {
        accuracy = await metrics[1].data(); // Assuming accuracy is the second metric
    } else {
        accuracy = await metrics.data(); // If accuracy is the only metric
    }
    console.log(typeof accuracy[0])
    console.log(JSON.stringify(accuracy[0]))
    console.log('Validation accuracy:', accuracy[0]);
    return Math.round(accuracy[0]*100);
}