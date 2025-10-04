import { Button } from '../Button';
import { TextInput } from '../TextInput';
import './todo-form.style.css';

export function ToDoForm({ onSubmit, selectedTodo }) {
  return (
    <form action={onSubmit} className="todo-form">
      <TextInput placeholder="Digite o item que deseja adicionar" name="description" defaultValue={selectedTodo?.description}/>
      <Button>Salvar item</Button>
    </form>
  );
}
