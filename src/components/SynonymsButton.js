const SynonymsButton = (props) => {
    const {datamuseRequest,input, generate, OutputList} = props;

    function getUrl(ml) {
        return 'https://api.datamuse.com/words?ml='+input;
    };

    function showSynonyms(output) {

        const wordToShow = [];
        if (output.length) {
            wordToShow.push(<h2 key="titleSyn">Words with a similar meaning to {input}: </h2>)
            wordToShow.push(
                <ul key='ul'>
                    {generate(output)}
                </ul>
            );
        } else {
            wordToShow.push(<p>no result</p>);
        }
        OutputList(wordToShow);
    };

    const synonyms = () => {
        datamuseRequest(getUrl(input),showSynonyms)
    };

    return (
        <button onClick={synonyms} type="button" className="btn btn-secondary">Show synonyms</button>
    )
};

export default SynonymsButton;