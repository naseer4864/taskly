import { useState } from "react";
import moment from 'moment';



const Todo = ({ Todo, handleEdit, handleDelete, createdAt }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(Todo);


    const handleOnsubmit = (e) => {
        e.preventDefault();
        handleEdit(editValue);
        setIsEditing(false)
    }

 
    return (
        <div className="todo">
            {
                isEditing ? (
                    <form onSubmit={handleOnsubmit}>
                        <input type="text" placeholder="Edit your Todo" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                        <button type="submit" >save</button>
                    </form>
                ) :
                    (
                        <div className="edit">
                            <p>{Todo}</p>
                            <p>Updated on: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            <div className="todo-btn">
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default Todo;