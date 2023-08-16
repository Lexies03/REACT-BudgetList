import ImageDone from '../Assets/done.png';
import ImageEdit from "../Assets/edit.png";
import ImageDelete from "../Assets/delete.png";

const Instruction = () =>{
    return (
      <div>
        <h1 className="instructions-header"> Instruction</h1>
        <article>
          <h3 className="instructions-subheader">ICONS</h3>
          <div className="article-content">
            <img
              src={ImageDone}
              alt="done"
              className="img-instructions-icons"
            />
            <span>DONE</span>
            <span>
              - This will hide the grocery from the list. It will not affect the
              caculation of the items.
            </span>
          </div>
          <div className="article-content">
            <img
              src={ImageEdit}
              alt="edit"
              className="img-instructions-icons"
            />
            <span>EDIT</span>
            <span>
              - This will update the specific item from the list through getting all its information to the input fields.
            </span>
          </div>
          <div className="article-content">
            <img
              src={ImageDelete}
              alt="delete"
              className="img-instructions-icons"
            />
            <span>DELETE</span>
            <span>
              - This will delete the specific item on the list.
            </span>
          </div>
        </article>
      </div>
    );
}

export default Instruction;