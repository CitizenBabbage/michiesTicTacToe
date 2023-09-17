import React from 'react';


export class DownloadError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorData: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({ errorData: { error, info } });
    }

    downloadNetData = () => {
        const networkData = this.props.net; 
        const networkString = JSON.stringify(networkData, null, 2);

        const netblob = new Blob([networkString], {type: "text/plain"});

        const neturl = URL.createObjectURL(netblob);


        const a = document.createElement("a");
        a.style.display = "none";
        a.href = neturl;
        a.download = "netData.json";

        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(neturl);

        
    }

    downloadTrainingSetData = () => {
        const trainingSetData = this.props.trainingSet; 
        const trainingString = JSON.stringify(trainingSetData, null, 2);

        const trainingblob = new Blob([trainingString], {type: "text/plain"});

        const trainingurl = URL.createObjectURL(trainingblob);

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = trainingurl;
        a.download = "trainingData.json";

        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(trainingurl);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <p>Something went wrong.</p>
                    <button onClick={this.downloadNetData}>Download Net Data</button>
                    <button onClick={this.downloadTrainingSetData}>Download TrainingSet Data</button>
                </div>
            );
        }

        return this.props.children;
    }
}
