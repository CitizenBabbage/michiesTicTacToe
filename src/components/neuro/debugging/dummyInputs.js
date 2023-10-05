import { net } from './net'
import { trainingSet } from './trainingSet.js'
import { checkNetData } from '../../../auxiliary/testers/errorCheckers.js'

export function makeNetwork(size){ // size should be a 4 array [size of input, size of hidden, size of output, depth (i.e. number of hidden +2) ]
    //console.log("makeNetwork: length of net is: ", net.length)
    checkNetData(net, "makeNetwork")
    return net
}

export function getTrainingSet(){
    return trainingSet
}