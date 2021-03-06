import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MuIconButton from '../../components/button/MuIconButton';
import MuTextField from '../../components/input/textField/MuTextField';
import { constant } from '../../configs/constants';
import { enumeration } from '../../configs/enumeration';
import { isInputValid } from '../../helpers/validationHelpers';
import useInput from '../../hooks/use-input';
import { todoTranslation } from '../../resources/todo/todoTranslation';
import { addTodoList } from '../../redux/actions/todo-action';

const TodoAdd = () => {
  const {
    value: todoValue,
    hasError: isTodoHasError,
    valueChangeHandler,
    inputBlurHandler,
  } = useInput('', isInputValid);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addTodoClicked = () => {
    dispatch(
      addTodoList(todoValue, () => {
        navigate('/');
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === enumeration.keyboard.enter) addTodoClicked();
  };
  return (
    <div className='d-flex justify-content-between border border-3 rounded py-2'>
      <MuTextField
        className='ms-3'
        onKeyDown={handleKeyDown}
        error={isTodoHasError}
        fullWidth
        label={todoTranslation.title}
        variant='standard'
        autoFocus
        value={todoValue}
        helperText={
          isTodoHasError &&
          `${todoTranslation.minimumLetter} ${constant.minNumberOfLetters}`
        }
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
      />
      <MuIconButton
        className='ms-4 me-1 px-4'
        onClick={addTodoClicked}
        disabled={isTodoHasError}
      >
        <FontAwesomeIcon icon={faPlusSquare} />
      </MuIconButton>
    </div>
  );
};

export default TodoAdd;
