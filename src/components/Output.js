import {useState} from 'react';
import WordList from "./WordList"
import RhymeButton from "./RhymeButton"
import SynonymsButton from "./SynonymsButton"

const OutputList = () => {
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [saved, setSaved] = useState([]);

    function groupBy(objects, property){

        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map();

        for(const object of objects) {
            const groupName = property(object);

            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }


        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    };

    function getRhymeUrl(rel_rhy) {
        return 'https://api.datamuse.com/words?rel_rhy='+input;
    }

    const datamuseRequest = (url, callback) => {
        setOutput(()=>{
            return <p>...Loading</p>
        });
        fetch(url)
            .then((response) => response.json())
            .then((data) => {

                callback(data);
            }, (err) => {
                console.error(err);
            });
    };

    function generateWords(term) {
        const wordlist = term.map((words)=>{
            return <li key={"wd"+words.word}>{words.word} <button onClick={()=>addToSavedWords(words.word)} type="button" className="btn btn-secondary">(save)</button> </li>
        });
        return wordlist;
    }

    const rhyme = (result) => {
        const groupOutput = groupBy(result,"numSyllables");
        const wordToShow = [];
        if (result.length !== 0) {
            wordToShow.push(<h2 key="title">Words that rhyme with {input}: </h2>);
            Object.entries(groupOutput).map(([numSyllables,items],index)=>{
                // console.log("@@@@",items);
                wordToShow.push(
                    <div key={index}>
                        <h3 key={'title'+index}>Syllables: {numSyllables} </h3>
                        <ul key={'ul'+index}>
                            {generateWords(items)}
                        </ul>
                    </div>
                )
            })
        } else {
            wordToShow.push(<p>(no results)</p>);
        }
        setOutput(wordToShow);
    };

    function addToSavedWords(item) {
        setSaved((previousList)=> {
            return [...previousList,item]
        })
    };

    return (
        <>
            <div className="row">
                <WordList wordList={saved}/>
            </div>
            <div className="row">
                <div className="input-group col">
                    <input className="form-control" type="text" placeholder="Please enter a word"
                           onChange={(e)=>{
                               setInput(e.target.value);

                           }}

                           onKeyDown={(e) => {
                               if (e.key==="Enter"){

                                   datamuseRequest(getRhymeUrl(input),rhyme);
                               }}}
                    />
                    <RhymeButton
                        input={input}
                        rhyme={rhyme}
                        datamuseRequest={datamuseRequest}
                        getRhymeUrl={getRhymeUrl}
                    />
                    <SynonymsButton
                        input={input}
                        datamuseRequest={datamuseRequest}
                        generate={generateWords}
                        OutputList={setOutput}
                    />
                </div>
            </div>

            <div className="row">
                <h2 className="col"></h2>
            </div>
            <div className="output row">
                <output className="col">{output}</output>
            </div>
        </>
    )
}

export default OutputList;