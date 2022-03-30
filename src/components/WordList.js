const WordList = (props) => {
    const {wordList} = props;

    if (wordList.length) {
    return (
        <div className="col">Saved words: <span> {wordList.join(', ')} </span></div>
    )} else {
        return(
            <div className="col">Saved words: <span>(none)</span></div>
        )}
};

export default WordList;