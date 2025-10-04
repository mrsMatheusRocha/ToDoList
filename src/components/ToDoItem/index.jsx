import './todo-item.style.css'
import { IconPencil, IconTrash } from "../icons";
import ToDoContext from '../ToDoProvider/ToDoContext';
import { use } from 'react';

export function ToDoItem ({ item}) {
    const { toggleTodoCompleted, removeTodo, openDialogForm } = use(ToDoContext);
    const styles = ['todo-item']

    if (item.completed) {
        styles.push('completed')
    }

    return (
        <li className={styles.join(' ')}>
            <p className="date">
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <div className="details">
                <input 
                    type="checkbox" 
                    className="checkbox" 
                    defaultChecked={item.completed} 
                    onClick={() => toggleTodoCompleted(item)}
                />
                <p className="description">
                    {item.description}
                </p>
                <div className="actions">
                    <button className="btn" onClick={() => removeTodo(item)}>
                        <IconTrash />
                    </button>
                    <button className="btn" onClick={() => openDialogForm(item)}>
                        <IconPencil />
                    </button>
                </div>
            </div>
        </li>
    )
}