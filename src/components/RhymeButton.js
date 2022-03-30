const RhymeButton = (props) => {

    const {datamuseRequest, getRhymeUrl, rhyme, input} = props;

    return (
        <button type="button" className="btn btn-primary" onClick={()=>datamuseRequest(getRhymeUrl(input),rhyme)}>Show rhyming words</button>
    )
};

export default RhymeButton;