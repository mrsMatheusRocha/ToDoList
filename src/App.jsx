import { use } from "react";
import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import Dialog from "./components/Dialog";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { TextInput } from "./components/TextInput";
import { Button } from "./components/Button";
import { ToDoForm } from "./components/ToDoForm";
import ToDoContext from "./components/ToDoProvider/ToDoContext";
import { TodoGroup } from "./components/TodoGroup";
import { EmptyState } from "./components/EmptyState";

function App() {
  const {
    todos,
    addTodo,
    closeDialog,
    openDialogForm,
    showDialog,
    selectedTodo,
    editSelectedTodo,
  } = use(ToDoContext);

  const handleFormSubmit = (formData) => {
    if (selectedTodo) {
      editSelectedTodo(formData);
    } else {
      addTodo(formData);
    }
    closeDialog();
  };

  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>
        <ChecklistsWrapper>
          <TodoGroup
            heading="Para estudar"
            items={todos.filter((t) => !t.completed)}
          />
          {todos.length == 0 && <EmptyState />}
          <TodoGroup
            heading="Concluído"
            items={todos.filter((t) => t.completed)}
          />
          <Footer>
            <Dialog isOpen={showDialog} onClose={closeDialog}>
              <ToDoForm onSubmit={handleFormSubmit}>
                <TextInput
                  placeholder="Digite o item que deseja adicionar"
                  required
                />
                <Button>Salvar item</Button>
              </ToDoForm>
            </Dialog>
            <FabButton onClick={() => openDialogForm()}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
